import flash from "connect-flash";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { IProfile, OIDCStrategy, VerifyCallback } from "passport-azure-ad";
import { config } from "./config";

export const configure = (app: Application) => {
  // Configure simple-oauth2
  const oauth2 = require("simple-oauth2").create(config.oauth);

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

  router.get("/test", (_req: Request, res: Response) => {
    res.json({});
  });
  router.get("/fail", (_req: Request, res: Response) => {
    res.send("you failed.");
  });

  /* GET auth callback. */
  router.get(
    "/signin",
    passport.authenticate("azuread-openidconnect", {
      prompt: "login",
      failureRedirect: "/auth/fail"
    }),
    (_req, res) => {
      res.redirect("/");
    }
  );

  router.post(
    "/callback",
    passport.authenticate("azuread-openidconnect", {
      failureRedirect: "/auth/fail",
      failureFlash: true
    }),
    (_req, res) => {
      res.redirect("/ui/success");
    }
  );

  router.get("/signout", (req: Request, res) => {
    if (req.session) {
      req.session.destroy(_err => {
        req.logout();
        res.redirect("/");
      });
    }
  });

  app.use(
    "/ui",
    express.static(`${__dirname}/../public/`, {
      extensions: ["html"]
    })
  );
  app.use("/auth", router);
};
