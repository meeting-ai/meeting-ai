import { OAuthService } from "../services/oauth";
import { create, AccessToken } from "simple-oauth2";
import { config } from "../config";
import { AccountLinkerService } from "../services/account-linker";

// Configure simple-oauth2
const oauth2 = create(config.oauth);

export function createAccessToken(params: any): AccessToken {
  return oauth2.accessToken.create(params);
}

interface ISlackPayload {
  token: string; // "Xyz0Xyz0Xyz0Xyz0Xyz0Xyz0";
  team_id: string; // "0Xyz0Xyz0";
  team_domain: string; // "dynatrace";
  channel_id: string; // "XYZ0XYZ04";
  channel_name: string; // "privategroup";
  user_id: string; // "UJQ66XYZ0";
  user_name: string; // "thomas.carrio";
  command: string; // "/meet";
  text: string; // "yooooo";
  response_url: string; // "https://hooks.slack.com/commands/TXYZ0XYZ0/123706000000/Xyz0rXyz0eSXXyz0Xyz0Xyz0";
  trigger_id: string; // "800385090084.241366759330.0123456789abcb8cd4011b320972f";
}

interface ISlackMiddlewareObject {
  payload: ISlackPayload;
  context: any;
  say: any;
  next: any;
}

export function authMiddleware({
  payload,
  context,
  say,
  next,
}: ISlackMiddlewareObject) {
  const slackUserId = payload.user_id;

  if (!slackUserId) {
    return handleError("UNDEFINED", say);
  }

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
    `I'm sorry <@${slackUserId}>, you haven't linked your account yet! <${config.express.protocol}://${config.express.host}/auth/signin/${guid}|Link your account here>.`
  );
  return;
}
