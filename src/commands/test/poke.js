import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import res from './response.json' assert { type: 'json' }
import { getSortedUsers } from '../../db/database.js';
import specialUsers from './specialusers.json' assert { type: 'json' };

export const data = new SlashCommandBuilder()
    .setName('poke')
        .setDescription('Poke the bot <3');

/** @param {ChatInputCommandInteraction<CacheType>} interaction  */
export async function execute(interaction) {
    const sortedUsers = await getSortedUsers();
    const specialUserIds = specialUsers.map(user => user.uid); // Assuming specialUsers is loaded correctly

    const invalid = res['invalid'] || [];
    const valid = res['valid'] || [];

    if (!invalid.length || !valid.length) {
        console.error('Error: "invalid" or "valid" responses are missing or empty in response.json');
        interaction.reply('An error occurred. Please try again later.');
        return;
    }

    if (sortedUsers[0].uid !== interaction.user.id && !specialUserIds.includes(interaction.user.id)) {
        interaction.reply(invalid[Math.floor(Math.random() * invalid.length)]);
        return;
    }

    interaction.reply(valid[Math.floor(Math.random() * valid.length)]);
}
