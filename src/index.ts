import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import DiscordBot from "@client/DiscordBot";



fs.writeFileSync("./terminal.log", "[INFO]".blue + " [Bot loaded].\n", "utf-8");
const client = new DiscordBot();
client.connect();

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
