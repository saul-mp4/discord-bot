const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.once("ready", () => {
    console.log("We are ready");
});

client.on('message', async message => {
    if (message.content === '-ping') {
        message.reply(`${message.member} poshel naxuy!`);
        return;
    } else if (message.content === '-play') {
        const channel = message.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
    }
});

client.on("error", console.warn);
client.login(process.env.TOKEN);