import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import res from './response.json' with { type: 'json' }

export const data = new SlashCommandBuilder()
    .setName('poke')
	.setDescription('Grr');

    /** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    if (!(interaction.user.id === "932164235654479913" || interaction.user.id === "938869793103151196")) {
        let invalid = res['invalid']
        interaction.reply(invalid[Math.floor(Math.random() * invalid.length)])
        return
    }

    let vaild = res['vaild']
    interaction.reply(vaild[Math.floor(Math.random() * vaild.length)])
}
