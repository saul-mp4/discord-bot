const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'resume',
    command: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Continue current paused song'),
    run: async (interaction, client) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.editReply("No songs! No queue? No balls ಥ_ಥ");

        queue.setPaused(false);

        await interaction.editReply('Pesnya prodolzhaytesya, /pause chtoby stop (ᵔᴥᵔ)');
    }
}