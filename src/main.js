import { RenderCommands } from './renderCommands.js'
import { Client, GatewayIntentBits, Events, ActivityType } from 'discord.js';
import {config} from 'dotenv';
import { connectToDB } from './db/database.js';
import responese from './responses/responses.json' with { type: "json" }
config()

console.log(responese)

const token = process.env.TOKEN
const dbUri = process.env.DB_URI
if (!token) throw new Error("No token found in enviroment varibles")
if (!dbUri) throw new Error("No DB uri found in enviroment varibles")

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	] 
});

async function main() {
	client.on(Events.InteractionCreate, async interaction => {
		if (interaction.isChatInputCommand()){
			// command handling
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No cmd ${interaction.commandName}`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		} else if (interaction.isAutocomplete()) {
			//auto complete
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No cmd ${interaction.commandName}`);
				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	});

	client.on('messageCreate', msg => {
		if (msg.author.id !== client.user.id) {
			for (let i = 0; i < responese.length; i++) {
				if (msg.content.toLocaleLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') === responese[i][0]) {
					msg.reply(responese[i][1])
					break
				}
			}
		}
	})

	client.on('ready', async bot => {
		console.log(`Connected to ${bot.user.tag}`)
		
		client.user.setActivity({
			name: "you sleep",
			type: ActivityType.Watching,
			url: "http://localhost:8080"
		})
	})
}

console.log("Attempting to connect to DB")

if (!dbUri) {
	console.log("No database url detected")
	console.log(dbUri)
	process.exit()
} else {
	await connectToDB(dbUri)
}

await RenderCommands(client, token, process.env.GUILD_ID, process.env.BOT_ID)

client.login(token);

main()