import { model, Schema } from "mongoose";

const OAUTH_COLLECTION = "OAUTH";

const OAuthSchema: Schema = new Schema({
  slack: { type: String, required: true },
  token_type: { type: String, default: "Bearer", required: true },
  scope: { type: String, required: true },
  expires_in: { type: Number, required: true },
  ext_expires_in: { type: Number, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  id_token: { type: String, required: true }
});

const OAuthModel = model(OAUTH_COLLECTION, OAuthSchema);

interface IOAuthParams {
  token_type: "Bearer";
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
  id_token: string;
}

export { OAUTH_COLLECTION, OAuthSchema, OAuthModel, IOAuthParams };
