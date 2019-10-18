import { NlpManager } from "node-nlp";
import { manager } from "./manager";
import { EN } from "./util/constants";
import { IProcessed } from "./types";
import { availabilityId, bookingId, helpId, logoutId } from "./phrases";

let nlpLoaded = false;

export async function loadNlp(): NlpManager {
  if (!nlpLoaded) {
    await manager.train();
    nlpLoaded = true;
  }
  return manager;
}

export async function process(phrase: string): Promise<IProcessed> {
  const mgr = await loadNlp();
  return await mgr.process(EN, phrase);
}

export const phraseIds = { availabilityId, bookingId, helpId, logoutId };
