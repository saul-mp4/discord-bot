const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'pause',
    command: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses playing song'),
    run: async (interaction, client) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.editReply("No songs! No queue? No balls ಥ_ಥ");

        queue.setPaused(true);

        await interaction.editReply('Pesnya otanovlena, /resume chtoby continue (ᵔᴥᵔ)');
    }
}