const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',

    command: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song'),

    run: async (interaction, client) => {
        const queue = client.player.getQueue(interaction.guildId);
        const embed = new MessageEmbed();

        if (!queue) return await interaction.editReply("No songs! No queue? No balls ಥ_ಥ");

        const currentSong = queue.current;
        embed.setDescription(`${currentSong.title} \nPesnya syebalas' (▀̿Ĺ̯▀̿ ̿)`);

        queue.skip();
        await interaction.editReply({
            embeds: [embed]
        });
    }
}