import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getUser } from '../../db/database.js';

export const data = new SlashCommandBuilder()
	.setName('transfer')
	.setDescription(`Transfer money to another member`)
    .addIntegerOption(option =>
        option.setName('amount')
            .setDescription('Amount of money')
            .setRequired(true))
	.addUserOption(option =>
		option.setName('payee')
			.setDescription('User to transfer money to')
            .setRequired(true))

/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    const TransationFailed = (reason) => interaction.reply({ content:`> *Transaction* **Failed**\n> ${reason}\n> If you think this is an issue with our bot please create a ticket.`, ephemeral:true })
    const amount = interaction.options.getInteger('amount', true)
    const member = interaction.options.getMember('payee', true)
    if (amount === null || member === null) {
        console.log("Null transaction", amount, member, interaction)
        return
    }
    const response = await interaction.reply("\u2800")
    
    const payee = await getUser(member.user.id)
    const payer = await getUser(interaction.user.id)

    // TODO: create account if user does not have
    if (payer === null) {
        TransationFailed(`Account not found ${interaction.user}`)
        return
    }

    if (payee === null) {
        TransationFailed(`Account not found ${member.user}`)
        return
    }

    if (payer.balance < amount) {
        TransationFailed(`Not enough money`)
        return
    }

    payer.balance -= amount
    payee.balance += amount

    payer.save()
    payee.save()
        
    response.edit(`> **Transferring:** *$${amount}*\n> From: **${interaction.user}** ➜ **${member}**`)
}
