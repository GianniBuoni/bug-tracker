import PocketBase from "pocketbase";
import { env } from "process";

export const pb = new PocketBase(process.env.PB_HOST);
