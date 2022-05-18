const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',

    command: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays song')
        .addStringOption(option => option.setName('song').setDescription('url or kewords').setRequired(true)),

    run: async (interaction, client) => {
        //Check who sent the message if he in VC
        if (!interaction.member.voice.channelId) {
            return await interaction.editReply({ content: `${interaction.member} zaydi v golosovoe ༼ つ ◕_◕ ༽つ`, ephemeral: true });
        }
        //Check if bot on other channel
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.editReply({ content: `${interaction.member} ya ne s toboy v kanale ¯\_(ツ)_/¯`, ephemeral: true });
        }

        // Name of song
        const query = interaction.options.getString('song')
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        const embed = new MessageEmbed();

        //Connecting to VC
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.editReply(`Ne poluchilos' podrubitsya ◉_◉`);
        }

        //Try to find song
        const track = await client.player.search(query, {
            requestedBy: interaction.member.user
        }).then(x => x.tracks[0]);

        if (!track) return interaction.editReply(`${query}, ne nashli track (ಥ﹏ಥ)`);

        queue.addTrack(track);
        embed.setDescription(`**${track.title}** \nPesnya dobavlena v queue ヾ(⌐■_■)ノ♪`)
            .setThumbnail(track.thumbnail)
            .setFooter({ text: `Duration: ${track.duration}` });

        if (!queue.playing) await queue.play();

        await interaction.editReply({
            embeds: [embed]
        });
    }
}