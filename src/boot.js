import { connectDB } from "./helpers/db.js";
import { connectWithOpenAI } from "./helpers/openAI.js";

export const boot = async () => {
  try {
    const dbInit = connectDB();
    const openAIInit = connectWithOpenAI();

    await Promise.all([
      dbInit,
      openAIInit,
    ]);
  } catch (error) {
    console.error("Error booting up server", error);
  }
}