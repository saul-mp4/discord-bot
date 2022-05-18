const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config');
const commands = require('./commands');

const slashCommands = [];

for (const commandName in commands) {
    slashCommands.push(commands[commandName].command);
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Refreshing (/) commands');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: slashCommands }
        );

        console.log('Commands was deployed');
    } catch (error) {
        console.error(error);
    }
})();