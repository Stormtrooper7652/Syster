import { SlashCommandBuilder, ChatInputCommandInteraction, IntegrationApplication, basename } from 'discord.js';
import { createUser, getUser } from '../../db/database.js';
import { BankPage } from '../../embeds/bank.js';

export const data = new SlashCommandBuilder()
	.setName('balance')
	.setDescription(`Returns the player's balance`)
	
/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    var query = await getUser(interaction.user.id)
	var user

    if (query === null) {
        console.log(`Created new user ${interaction.user.tag} [${interaction.user.id}]`)
        user = await createUser(interaction.user.id, 100)
    } else user = query

    interaction.reply({ embeds: [BankPage(interaction.user.globalName, user.balance)] })
}
