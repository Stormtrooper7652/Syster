import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { lastCycle, processCycle } from '../../cycle';
import { getDay } from '../../utility';

export const data = new SlashCommandBuilder()
	.setName('cycle')
	.setDescription('Force runs cycle');
	
/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction, _, env) {
    await processCycle(client)
    lastCycle = getDay()
	await interaction.reply("Done master!")
}