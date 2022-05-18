const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'stop',
    command: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops playing song'),
    run: async (interaction, client) => {
        await interaction.reply('stop');
    }
}