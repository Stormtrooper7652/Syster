import { RenderCommands } from './renderCommands.js';
import { Client, GatewayIntentBits, Events, ActivityType, Collection } from 'discord.js';
import { connectToDB } from './db/database.js';
import dotenv from 'dotenv';

declare module 'discord.js' {
    interface Client {
        commands?: Collection<string, any>;
    }
}

dotenv.config();

const token: string | undefined = process.env.TOKEN;
const dbUri: string | undefined = process.env.DB_URI;

if (!token) throw new Error("No token found in environment variables");
if (!dbUri) throw new Error("No DB URI found in environment variables");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

async function main(): Promise<void> {
    client.on(Events.InteractionCreate, async interaction => {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands?.get(interaction.commandName);

            if (!command) {
                console.error(`No cmd ${interaction.commandName}`);
                return;
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands?.get(interaction.commandName);

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
        const message = msg.content.toLowerCase();
        if (
            (message === 'hru' || message === 'good hbu') &&
            msg.author.id !== client.user?.id
        ) {
            msg.reply(Math.random() < 0.01 ? 'good hbu' : 'better hbu');
        }
    });

    client.on('ready', async bot => {
        console.log(`Connected to ${bot.user.tag}`);

        client.user?.setActivity({
            name: 'you sleep',
            type: ActivityType.Watching,
            url: 'http://localhost:8080',
        });
    });
}

(async () => {
    await RenderCommands(
        client,
        token as string,
        process.env.GUILD_ID,
        process.env.BOT_ID
    );

    console.log('Attempting to connect to DB');

    if (!dbUri) {
        console.log('No database URL detected');
        console.log(dbUri);
        process.exit();
    } else {
        await connectToDB(dbUri);
    }

    await client.login(token);
    main();
})();
