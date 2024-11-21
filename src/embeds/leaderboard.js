import { EmbedBuilder } from "discord.js";

export const LeaderBoardPage = (gdp, user1, user2, user3) => { // im tired so i dont wanna make this good
    return new EmbedBuilder()
        .setColor(0xFEC7DC)
        .setAuthor({ name: "Syster top client's", url: 'http://localhost:8080' })
	    .setDescription(`Catgirl's rule the world!`)
        .setThumbnail('https://cdn.discordapp.com/attachments/972464025298419742/1309140856502095892/skid.png?ex=67407fee&is=673f2e6e&hm=1a03d24a1c593b225f8bfff926020bb48a32ff6c1296356ed60483bec9393d49&')
        .addFields(
            { name: 'Server GDP', value: `${gdp}` },
            { name: '\u200B', value: '\u200B' },
            { name: `1. ${user1.name}`, value: `\u200B  $${user1.balance}`, inline: true },
            { name: `2. ${user2.name}`, value: `\u200B  $${user2.balance}`, inline: true },
            { name: `3. ${user3.name}`, value: `\u200B  $${user3.balance}`, inline: true }
        )
        .setTimestamp()
	    .setFooter({ text: "My best client can poke me >w<"});
}