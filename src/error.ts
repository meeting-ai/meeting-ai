export class ConfigError extends Error {
  public constructor(name: string) {
    super(`No environment variable configured for ${name}`);
  }
}

export class AccountLinkNotFoundError extends Error {
  public constructor() {
    super(`The user has not linked their account`);
  }
}
