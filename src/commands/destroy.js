const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'destroy',
    command: new SlashCommandBuilder()
        .setName('destroy')
        .setDescription('Stop songs and clear queue'),
    run: async (interaction, client) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.editReply("No songs! No queue? No balls ಥ_ಥ");

        queue.destroy();

        await interaction.editReply('Poka poka (;´༎ຶД༎ຶ`)');
    }
}