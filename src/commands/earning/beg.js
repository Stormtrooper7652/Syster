import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import res from './response.json' assert { type: 'json' };
import { addMoney } from '../../db/database.js';

export const data = new SlashCommandBuilder()
    .setName('beg')
    .setDescription('Beg for money');

const cooldowns = new Map();

/** @param {ChatInputCommandInteraction<CacheType>} interaction */
export async function execute(interaction) {
    const userId = interaction.user.id;
    const now = Date.now();

    const cooldownExpiration = cooldowns.get(userId);
    if (cooldownExpiration && now < cooldownExpiration) {
        const timeLeft = (cooldownExpiration - now) / 1000;
        interaction.reply(`You must wait ${Math.ceil(timeLeft / 60)} more minutes before begging again!`);
        return;
    }

    const randomNumber = Math.random();
    let response;

    if (randomNumber < 0.5) { 
        const moneyToAdd = Math.floor(Math.random() * 100) + 1;
        await addMoney(interaction.user.id, moneyToAdd);
        const validIndex = Math.floor(Math.random() * res.validBeg.length);
        response = res.validBeg[validIndex]; 
        response += ` You received ${moneyToAdd} coins!`; 
    } else {
        const invalidIndex = Math.floor(Math.random() * res.invalidBeg.length);
        response = res.invalidBeg[invalidIndex]; 
    }

    cooldowns.set(userId, now + 900000); 
    interaction.reply(response);
}
