import { ConfigError } from "../error";

const identity = getEnv("OAUTH_AUTHORITY");
const metadata = getEnv("OAUTH_ID_METADATA");
const identityMetadata = identity + metadata;

export const config = {
  db: getEnv("MONGODB_URI", "mongodb://localhost/meeting-ai"),
  oauth: {
    client: {
      id: getEnv("OAUTH_APP_ID"),
      secret: getEnv("OAUTH_APP_PASSWORD")
    },
    auth: {
      tokenHost: getEnv("OAUTH_AUTHORITY"),
      authorizePath: getEnv("OAUTH_AUTHORIZE_ENDPOINT"),
      tokenPath: getEnv("OAUTH_TOKEN_ENDPOINT")
    }
  },
  oidc: {
    identityMetadata,
    clientID: getEnv("OAUTH_APP_ID"),
    redirectUrl: getEnv("OAUTH_REDIRECT_URI"),
    clientSecret: getEnv("OAUTH_APP_PASSWORD"),
    scope: JSON.parse(getEnv("OAUTH_SCOPES"))
  },
  slack: {
    signingSecret: getEnv("SLACK_SIGNING_SECRET"),
    token: getEnv("SLACK_TOKEN")
  },
  express: {
    protocol: getEnv("PROTOCOL", "https"),
    host: getEnv("HOST", "localhost"),
    port: asNumber(getEnv("PORT", "3000"))
  }
};

export function getEnv(name: string, fallback?: string): string {
  if (name in process.env) {
    return process.env[name] as string;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new ConfigError(name);
}

export function asNumber(input: string): number {
  return Number.parseInt(input);
}
