export class ConfigError extends Error {
  public constructor(name: string) {
    super(`No environment variable configured for ${name}`);
  }
}
