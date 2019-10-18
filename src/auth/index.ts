import { OAuthService } from "../services/oauth";
import { create, AccessToken } from "simple-oauth2";
import { config } from "../config";
import { AccountLinkerService } from "../services/account-linker";

// Configure simple-oauth2
const oauth2 = create(config.oauth);

export function createAccessToken(params: any): AccessToken {
  return oauth2.accessToken.create(params);
}

export function authMiddleware({ payload, context, say, next }) {
  console.log(`payload: ${payload}`);
  console.log(`context: ${context}`);
  console.log(`say: ${say}`);
  console.log(`next: ${next}`);

  const slackUserId = payload.user;

  // Assume we have a function that can take a Slack user ID as input to find user details from the provider
  OAuthService.load(slackUserId)
    .then(oauthParams => {
      if (oauthParams === null) {
        return handleError(slackUserId, say);
      }

      // When the user lookup is successful, add the user details to the context
      context.oauth = createAccessToken(oauthParams);

      // Pass control to the next middleware (if there are any) and the listener functions
      next();
    })
    .catch(async () => {
      return handleError(slackUserId, say);
    });
}

async function handleError(slackUserId: string, say: any) {
  const guid = await AccountLinkerService.create(slackUserId);
  say(
    `I'm sorry <@${slackUserId}, you haven't linked your account yet! <${config.express.protocol}://${config.express.host}/auth/signin/${guid}|Link your account here>.`
  );
  return;
}
