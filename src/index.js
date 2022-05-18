const { Client, Intents } = require('discord.js');
const { Player } = require('discord-player');

const { TOKEN } = require('./config');
const commands = require('./commands');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

client.player.on("trackStart", (queue, track) => queue.metadata.channel.send(`Now playing ${track.title}`));

client.once("ready", () => {
    console.log("We are ready");
});

client.on('messageCreate', async message => {
    if (message.content === '-ping') {
        message.reply(`${message.member} poshel naxuy!`);
        return;
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    await interaction.deferReply();
    commands[interaction.commandName].run(interaction, client);
});

client.on("error", console.warn);
client.login(TOKEN);