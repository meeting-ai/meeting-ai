import express, { Request, Response } from 'express';
import passport from 'passport';

const authRoutes = express.Router();

authRoutes.get('/fail', (_req: Request, res: Response) => {
  res.send('you failed.');
});

/* GET auth callback. */
authRoutes.get('/signin', passport.authenticate('azuread-openidconnect',
  {
    prompt: 'login',
    failureRedirect: '/auth/fail'
  }),
  (_req, res) => {
    res.redirect('/');
  }
);

authRoutes.post('/callback', passport.authenticate('azuread-openidconnect',
  {
    failureRedirect: '/auth/fail',
    failureFlash: true
  }),
  (_req, res) => {
    res.redirect('/ui/success');
  }
);

authRoutes.get('/signout', (req: Request, res) => {
  if (req.session) {
    req.session.destroy((_err) => {
      req.logout();
      res.redirect('/');
    });
  }
});

export default authRoutes;