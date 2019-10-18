import UUIDv4 from "uuid/v4";
import { AccountLinkerModel, IAccountLinkerParams } from "../../db";

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

  public static async findByUser(
    slack: string
  ): Promise<IAccountLinkerParams | null> {
    const doc = await AccountLinkerModel.findOne({ slack });
    if (!doc) {
      return null;
    }

    return doc.toObject();
  }

  public static async findByUUID(
    guid: string
  ): Promise<IAccountLinkerParams | null> {
    const doc = await AccountLinkerModel.findOne({ guid });
    if (!doc) {
      return null;
    }

    return doc.toObject();
  }
}
