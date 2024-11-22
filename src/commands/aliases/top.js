import { SlashCommandBuilder } from "discord.js";
import * as cmd from "../banking/leaderboard.js";

export const data = new SlashCommandBuilder().setName('top').setDescription(cmd.data.description)
export const execute = cmd.execute