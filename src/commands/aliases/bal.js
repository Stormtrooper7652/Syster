import { SlashCommandBuilder } from "discord.js";
import * as cmd from "../banking/balance.js";

export const data = new SlashCommandBuilder().setName('bal').setDescription(cmd.data.description)
export const execute = cmd.execute