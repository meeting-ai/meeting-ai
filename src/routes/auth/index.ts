import express, { Response, Request, Application } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { OIDCStrategy, IProfile, VerifyCallback } from "passport-azure-ad";
import session from "express-session";
import flash from "connect-flash";
import authRoutes from "./routes";
import { config } from "../../config";
import { createAccessToken } from "../../auth";
import { OAuthService } from "../../services/oauth";

// Configure passport

// In-memory storage of logged-in users
// For demo purposes only, production routers should store
// this in a reliable storage
var users: any = {};

// Passport calls serializeUser and deserializeUser to
// manage users
passport.serializeUser(function(user: any, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done(null, user.profile.oid);
});

passport.deserializeUser(function(id: string, done) {
  done(null, users[id]);
});

// Callback function called once the sign-in is complete
// and an access token has been obtained
// (iss, sub, profile, accessToken, refreshToken, params, done)
async function signInComplete(
  _req: Request,
  _iss: string,
  _sub: string,
  profile: IProfile,
  _access_token: string,
  _refresh_token: string,
  params: any,
  done: VerifyCallback
) {
  if (!profile.oid) {
    return done(new Error("No OID found in user profile."), null);
  }

  const slack = _req.session!.slack;
  if (!slack) {
    return done(new Error('Slack not found in session'));
  }

  // Create a simple-oauth2 token from raw tokens
  let oauthToken = createAccessToken(params);

  await OAuthService.save(slack, params)

  // Save the profile and tokens in user storage
  users[profile.oid] = { profile, oauthToken };
  return done(null, users[profile.oid]);
}

// Configure OIDC strategy
passport.use(
  new OIDCStrategy(
    {
      ...config.oidc,
      responseType: "code id_token",
      responseMode: "form_post",
      allowHttpForRedirectUrl: true,
      validateIssuer: false,
      passReqToCallback: true
    },
    signInComplete
  )
);

const router = express.Router();

router.use(
  session({
    secret: "your_secret_value_here",
    resave: false,
    saveUninitialized: false,
    unset: "destroy"
  })
);

// Flash middleware
router.use(flash());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
// Initialize passport
router.use(passport.initialize());
router.use(passport.session());
router.use("/", authRoutes);

export default router;
