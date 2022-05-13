const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.once("ready", () => {
    console.log("We are ready");
});

client.on('message', async message => {
    if(message.content === '-play') {
        message.reply(`${message.member} OK!`);
    }
});

client.on("error", console.warn);
client.login(process.env.TOKEN);