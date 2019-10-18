import express, { Request, Response } from 'express';
import passport from 'passport';
import { AccountLinkerService } from '../../services/account-linker';

const authRoutes = express.Router();

authRoutes.get('/fail', (_req: Request, res: Response) => {
  res.send('you failed.');
});

/* test signin */
authRoutes.get('/signin/test', async (req, res) => {
  passport.authenticate('azuread-openidconnect',
  {
    prompt: 'login',
    failureRedirect: '/auth/fail'
  })(req, res),
  (_req, res) => {
    res.redirect('/');
  };
});

/* GET auth callback. */
authRoutes.get('/signin/:uuid', async (req, res) => {

  const result = await AccountLinkerService.findByUUID(req.params.uuid).catch(() => null)

  if (!result || !req.session){
    return res.status(404).send();
  } else {
    req.session.slack = result.slack;
  }

  passport.authenticate('azuread-openidconnect',
  {
    prompt: 'login',
    failureRedirect: '/auth/fail'
  })(req, res),
  (_req, res) => {
    res.redirect('/');
  };
});

authRoutes.post('/callback', passport.authenticate('azuread-openidconnect',
  {
    failureRedirect: '/auth/fail',
    failureFlash: true
  }),
  (_req, res) => {
    res.redirect('/success');
  });

authRoutes.get('/signout', (req: Request, res) => {
  if (req.session) {
    req.session.destroy((_err) => {
      req.logout();
      res.redirect('/');
    });
  }
});

export default authRoutes;