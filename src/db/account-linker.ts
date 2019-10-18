import { model, Schema } from "mongoose";

const ACCOUNT_LINKER_COLLECTION = "AccountLinker";

const AccountLinkerSchema: Schema = new Schema({
  slack: { type: String, required: true },
  guid: { type: String, required: true }
});

const AccountLinkerModel = model(
  ACCOUNT_LINKER_COLLECTION,
  AccountLinkerSchema
);

interface IAccountLinkerParams {
  slack: string;
  guid: string;
}

export {
  ACCOUNT_LINKER_COLLECTION,
  AccountLinkerSchema,
  AccountLinkerModel,
  IAccountLinkerParams
};
