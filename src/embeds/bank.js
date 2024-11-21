import { EmbedBuilder } from "discord.js";
const footers = [
    'Nowo refunds',
    'Safety not insured (or guaranteed)',
    'I dont actually work hear..',
    'Brokie^^^'
]

export const BankPage = (name, balance) => {
    return new EmbedBuilder()
        .setColor(0xFEC7DC)
        .setTitle(name)
        .setAuthor({ name: 'Syster-shell bank', url: 'http://localhost:8080' })
	    .setDescription(`Catgirl's rule the world!`)
        .setThumbnail('https://cdn.discordapp.com/attachments/972464025298419742/1309140856502095892/skid.png?ex=67407fee&is=673f2e6e&hm=1a03d24a1c593b225f8bfff926020bb48a32ff6c1296356ed60483bec9393d49&')
        .addFields(
            { name: 'Balance', value: `$${balance}` },
            { name: '\u200B', value: '\u200B' },
            { name: 'Depts', value: 'Some Stupid dept you\'re in', inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Expenses', value: 'Oh.. my rent is due', inline: true },
        )
        .setTimestamp()
	    .setFooter({ text: footers[Math.floor(Math.random() * footers.length)] });
}