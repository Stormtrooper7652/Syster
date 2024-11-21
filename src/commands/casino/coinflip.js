import { SlashCommandBuilder, ChatInputCommandInteraction, IntegrationApplication, basename } from 'discord.js';
import { createUser, getUser } from '../../db/database.js';
import { BankPage } from '../../embeds/bank.js';

export const data = new SlashCommandBuilder()
	.setName('coinflip')
	.setDescription(`Flip a coin`)
    .addIntegerOption(op => 
        op.setName('Bet'))
	
/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
}
