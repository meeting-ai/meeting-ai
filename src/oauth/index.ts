import { OAuthModel, IOAuthParams } from "../db";

export class OAuthService {
  public static async save(slack: string, params: IOAuthParams) {
    const entry = new OAuthModel({ slack, ...params });
    await entry.save();
  }
  public static async load(slack: string) {
    return OAuthModel.findOne({ slack });
  }
}
