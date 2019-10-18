import UUIDv4 from "uuid/v4";
import { AccountLinkerModel, IAccountLinkerParams } from "../../db";
import { AccountLinkNotFoundError } from "../../error";

export class AccountLinkerService {
  public static async create(slack: string): Promise<string> {
    const guid = UUIDv4();
    await this.save(slack, guid);
    return guid;
  }

  private static async save(slack: string, guid: string) {
    const entry = new AccountLinkerModel({ slack, guid });
    await entry.save();
  }

  public static async findByUser(slack: string): Promise<IAccountLinkerParams> {
    const doc = await AccountLinkerModel.findOne({ slack });
    if (!doc) {
      throw new AccountLinkNotFoundError();
    }

    return doc.toObject();
  }

  public static async findByUUID(guid: string): Promise<IAccountLinkerParams> {
    const doc = await AccountLinkerModel.findOne({ guid });
    if (!doc) {
      throw new AccountLinkNotFoundError();
    }

    return doc.toObject();
  }

  public static async deleteAllByUser(slack: string): Promise<void> {
    AccountLinkerModel.deleteMany({ slack });
  }
}
