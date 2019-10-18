import express, { Response, Request, Application } from 'express';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { OIDCStrategy, IProfile, VerifyCallback } from 'passport-azure-ad';
import session from 'express-session';
import flash from 'connect-flash';
import authRoutes from './routes';

// Configure simple-oauth2
const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.OAUTH_APP_ID as string,
    secret: process.env.OAUTH_APP_PASSWORD as string,
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY as string,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT
  }
});

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
  done (null, user.profile.oid);
});

passport.deserializeUser(function(id: string, done) {
  done(null, users[id]);
});

// Callback function called once the sign-in is complete
// and an access token has been obtained
// (iss, sub, profile, accessToken, refreshToken, params, done)
async function signInComplete(_req: Request, _iss: string, _sub: string, profile: IProfile, _access_token: string, _refresh_token: string, params: any, done: VerifyCallback) {

  if (!profile.oid) {
    return done(new Error("No OID found in user profile."), null);
  }

  // try{
  //   const user = await graph.getUserDetails(accessToken);

  //   if (user) {
  //     // Add properties to profile
  //     profile['email'] = user.mail ? user.mail : user.userPrincipalName;
  //   }
  // } catch (err) {
  //   done(err, null);
  // }

  // remove the param b/c it bugs out in date-fns.
  // delete params.expires_in;

  // Create a simple-oauth2 token from raw tokens
  let oauthToken = oauth2.accessToken.create(params);

  // Save the profile and tokens in user storage
  users[profile.oid] = { profile, oauthToken };
  return done(null, users[profile.oid]);
}

// Configure OIDC strategy
passport.use(new OIDCStrategy(
  {
    identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
    clientID: process.env.OAUTH_APP_ID as string,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: process.env.OAUTH_REDIRECT_URI as string,
    allowHttpForRedirectUrl: true,
    clientSecret: process.env.OAUTH_APP_PASSWORD,
    validateIssuer: false,
    passReqToCallback: true,
    scope: JSON.parse(process.env.OAUTH_SCOPES as string,)
  },
  signInComplete
));

const router = express.Router();

router.use(session({
  secret: 'your_secret_value_here',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

// Flash middleware
router.use(flash());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
// Initialize passport
router.use(passport.initialize());
router.use(passport.session());
router.use('/', authRoutes);
