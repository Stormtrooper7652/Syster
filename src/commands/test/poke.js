import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import res from './response.json' with { type: 'json' }
import { getSortedUsers } from '../../db/database.js';

export const data = new SlashCommandBuilder()
    .setName('poke')
	.setDescription('Grr');

    /** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    if (
        (await getSortedUsers())[0].uid !== interaction.user.id &&
        !interaction.guild.members.cache.get(interaction.user.id).roles.cache.has('1308100766296309911') // awfu
    ) {
        let invalid = res['invalid']
        interaction.reply(invalid[Math.floor(Math.random() * invalid.length)])
        return
    }

    let vaild = res['vaild']
    interaction.reply(vaild[Math.floor(Math.random() * vaild.length)])
}
