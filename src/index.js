const { TOKEN } = require('./config');
const { Client, Intents } = require('discord.js');
const { Player } = require('discord-player');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const player = new Player(client);

const commands = {};
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for ( const file of commandFiles ) {
    const slashCommand = require(`./commands/${file}`);
    commands[slashCommand.name] = slashCommand;
}

player.on("trackStart", (queue, track) => queue.metadata.channel.send(`Now playing ${track.title}`));

client.once("ready", () => {
    console.log("We are ready");
});

client.on('messageCreate', async message => {
    if (message.content === '-ping') {
        message.reply(`${message.member} poshel naxuy!`);
        return;
    } else if (message.content.startsWith('-play')) {
        //Check who sent the message if he in VC
        if (!message.member.voice.channelId) return await message.reply(`${message.member} zaydi v golosovoe ༼ つ ◕_◕ ༽つ`);
        //Check if bot on other channel
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) {
            return await message.reply(`${message.member} ya ne s toboy v kanale ¯\_(ツ)_/¯`);
        }

        //Name of song
        const query = message.content.split(' ').slice(1).join(' ');
        //Check who sent the message if he wrote name of song after command
        if (!query) return message.reply(`${message.member} dai nazvanie pesni ಠ_ಠ`);
        

        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });

        //Connecting to VC
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
            return await message.reply(`Ne poluchilos' podrubitsya`);
        }

        //Try to find song
        const track = await player.search(query, {
            requestedBy: message.member.user
        }).then(x => x.tracks[0]);

        if (!track) return message.reply(`${query}, ne nashli track (ಥ﹏ಥ)`);

        queue.play(track);

        return await message.reply("priyatnogo proslushivaniya ヾ(⌐■_■)ノ♪");
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    await commands[interaction.commandName].run(interaction, client);
});

client.on("error", console.warn);
client.login(TOKEN);