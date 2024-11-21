import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');
	
/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
	await interaction.reply("Pong!")
}