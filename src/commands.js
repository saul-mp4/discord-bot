const fs = require('fs');

const commands = {};
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for ( const file of commandFiles ) {
    const slashCommand = require(`./commands/${file}`);
    commands[slashCommand.name] = slashCommand;
}

module.exports = commands;