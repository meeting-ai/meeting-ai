import mongoose, { Mongoose } from "mongoose";
import { config } from "../config";

let db: Mongoose;
const dbPromise = mongoose.connect(config.db);

export const loadMongo = async () => {
  db = await dbPromise;
};

export * from "./account-linker";
export * from "./oauth";
