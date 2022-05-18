const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'play',
    command: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays song')
        .addStringOption(option => option.setName('song').setDescription('url or kewords').setRequired(true)),
    run: async (interaction, client) => {
        await interaction.reply('play');
    }
}