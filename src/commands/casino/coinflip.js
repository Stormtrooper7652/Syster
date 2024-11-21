import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getUser } from '../../db/database.js';
const Delay = 1000 // ms

export const data = new SlashCommandBuilder()
	.setName('coinflip')
	.setDescription(`Flip a coin`)
    .addStringOption(op => op
        .setName('side')
        .setDescription('heads or tails?')
        .addChoices([
            { name: 'Heads', value: 'heads' },
            { name: 'Tails', value: 'tails' },
        ])
        .setRequired(true))
    .addIntegerOption(op => op
        .setName('bet')
        .setDescription('Amount of money you are betting')
        .setRequired(true))
/*
    .addMentionableOption(op => 
        op.setName('Play against')
        .setDescription('Amount of money you are betting'))
*/

/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    const side = interaction.options.getString("side", true)
    if (!(side === 'heads' || side === 'tails')) {
        interaction.reply({ content: "Please select heads or tails.", ephemeral: true })
        return
    }

    const bet = interaction.options.getInteger("bet", true)
    const account = await getUser(interaction.user.id)

    if (account.balance < bet) {
        interaction.reply({ content: (Math.random() > 0.9)? "> Brokie, get out of here." : "> You don't have enough money.", ephemeral: true })
        return
    }

    let flip = (Math.random() < 0.5)? 'heads' : 'tails'
    let haswon = false
    if (side === flip) {
        haswon = true
        account.balance += bet
    } else {
        account.balance -= bet
    }

    account.save()
    await (new Promise(res => setTimeout(res, Delay)))
    await interaction.reply(haswon?
        `> **${flip}**, you have earned **$${bet}**` :
        `> **${flip}**.. you lost **$${bet}**`
    )
}
