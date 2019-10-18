import mongoose from "mongoose";
import { config } from "../config";

export const db = mongoose.connect(config.db);

export * from "./oauth";
