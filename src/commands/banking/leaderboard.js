import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from 'discord.js';
import { LeaderBoardPage } from '../../embeds/leaderboard.js';
import { getUsers } from '../../db/database.js';

export const data = new SlashCommandBuilder()
    .setName('top')
	.setDescription('Get top three players');
    
/** 
 * @param {ChatInputCommandInteraction<CacheType>} interaction 
 * @param {Client<boolean>} client 
*/
export async function execute(interaction, client) {
    const users = await getUsers();
    let best = users.sort((a, b) => b.balance - a.balance).slice(0, 3)

    for (let i = 0; i < best.length; i++) {
        const element = best[i];
        best[i] = {
            name: (await client.users.fetch(element.uid)).globalName,
            balance: element.balance
        }
    }

    let gdp = 0
    for (let i = 0; i < users.length; i++) {
        gdp += users[i].balance
    }
    
    interaction.reply({ embeds: [LeaderBoardPage(gdp, ...best)]})
}
