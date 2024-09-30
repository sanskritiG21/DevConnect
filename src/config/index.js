import { config as dotenv } from "dotenv";

dotenv();

export const config = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 3030,
}