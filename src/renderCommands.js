import { Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rscan = (path) => 
    readdirSync(path).flatMap(v => 
        extname(v) === '' ? rscan(join(path, v)) : join(path, v)
    );

export async function RenderCommands(client, token, guildId, botId) {

    client.commands = new Collection();

    const filePaths = rscan(join(__dirname, 'commands')).filter(v => v.endsWith('js'));
    const rest = (new REST()).setToken(token);

    for (const file of filePaths) {
        const cmd = await import(file);

        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`Failed to pull ${file}`);
        }
    }

    const data = await rest.put(
        Routes.applicationCommands(botId),
        { body: Array.from(client.commands.values()).map(cmd => cmd.data.toJSON()) },
    );

    console.log(`Successfully loaded {${data.length}} commands`);
}
