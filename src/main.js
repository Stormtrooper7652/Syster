import { RenderCommands } from './renderCommands.js'
import { Client, GatewayIntentBits, Events, ActivityType } from 'discord.js';
import { connectToDB } from './db/database.js';
import { initWebhook } from './roblox/webhook.js';
(await import('dotenv')).config()

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
				await command.execute(interaction, client);
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

	client.on('messageCreate', async msg => {
		const message = msg.content.toLocaleLowerCase()
		if ((message=== 'hru' || message === 'good hbu') && msg.author.id !== client.user.id) msg.reply((Math.random() < 0.01)? "good hbu" : "better hbu")
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

(async () => {
	await RenderCommands(client, token, process.env.GUILD_ID, process.env.BOT_ID)
	
	console.log("Attempting to connect to DB")
	
	if (!dbUri) {
		console.log("No database url detected")
		console.log(dbUri)
		process.exit()
	} else {
		await connectToDB(dbUri)
	}
	
	await initWebhook(process.env.WEBHOOK_KEY, 7652, process.env.IP)
	
	client.login(token);

	main()
})()