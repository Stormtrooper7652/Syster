import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { createUser, getUser } from '../db/database.js';

export const data = new SlashCommandBuilder()
    .setName('test')
	.setDescription('Rawr');

    /** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    if (!(interaction.user.id === "932164235654479913" || interaction.user.id === "938869793103151196")) {
        interaction.reply({content:"You're not my master"})
        return
    }

    interaction.reply({content:"Ny"+"a".repeat(Math.round(Math.random() * 5) + 1)})

    return
    // const response = await createUser(interaction.user.id, 0)
    var quer = await getUser(interaction.user.id)
    if (quer.length > 1) {
        await interaction.reply({ content: "You're a ghost in the system...", ephemeral: true })
        return
    }
    var user = quer[0]    
    user.balance += 100
    await interaction.reply({ content: `${interaction.user.username}\n$${user.balance} chedder` })
    await user.save()
}
