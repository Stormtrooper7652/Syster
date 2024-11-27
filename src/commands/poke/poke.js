import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import res from './pokes.json' assert { type: 'json' }
import { getSortedUsers } from '../../db/database.js';

export const data = new SlashCommandBuilder()
    .setName('poke')
	.setDescription('Grr');

/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction, _, env) {
    const devs = env.DEVS.split(';')
    if ((await getSortedUsers())[0].uid !== interaction.user.id && devs.indexOf(interaction.user.id) === -1) {
        let invalid = res['invalid']
        interaction.reply(invalid[Math.floor(Math.random() * invalid.length)])
        return
    }

    let vaild = res['vaild']
    interaction.reply(vaild[Math.floor(Math.random() * vaild.length)])
}
