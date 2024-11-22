import { EmbedBuilder } from "discord.js";
interface user {
    balance: number | string;
    name: string;
}

export function LeaderBoardPage(gdp: number | string, ...users: user[]): EmbedBuilder { // im tired so i dont wanna make this good
    return new EmbedBuilder()
        .setColor(0xFEC7DC)
        .setAuthor({ name: "Syster-shell bank leaderboard", url: 'http://localhost:8080' })
	    .setDescription(`Syster top client's`)
        .setThumbnail('https://cdn.discordapp.com/attachments/972464025298419742/1309140856502095892/skid.png?ex=67407fee&is=673f2e6e&hm=1a03d24a1c593b225f8bfff926020bb48a32ff6c1296356ed60483bec9393d49&')
        .addFields(
            { name: 'Server GDP', value: `$${gdp}` },
            ...users.map((v, i, a) => ({ name: `${i+1}. ${v.name}`, value: `\u200B  $${v.balance}`, inline: true }))
        )
        .setTimestamp()
	    .setFooter({ text: "My best client can poke me >w<"});
}