import { OAuthModel, IOAuthParams } from "../../db";
import { AccountLinkNotFoundError } from "../../error";

export class OAuthService {
  public static async save(slack: string, params: IOAuthParams) {
    const entry = new OAuthModel({ slack, ...params });
    await entry.save();
  }
  public static async load(slack: string): Promise<IOAuthParams> {
    const doc = await OAuthModel.findOne({ slack });
    if (!doc) {
      throw new AccountLinkNotFoundError();
    }

    const oauth = doc.toObject();
    delete oauth.slack;
    return oauth;
  }
}
