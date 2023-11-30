const { SlashCommandBuilder } = require('discord.js');
const pvpSchema = require('../../model/pvpSchema.js');
const pveSchema = require('../../model/pveSchema.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prio')
		.setDescription('Sino mga prio ngayon?'),
	async execute(interaction) {
		let pvePlayers;
		let pvpPlayers;
		try {
			pvePlayers = await pveSchema.find({ date: { $gte: new Date().setDate(new Date().getDate() - 1) } });
			pvpPlayers = await pvpSchema.find({ date: { $gte: new Date().setDate(new Date().getDate() - 1) } });
			console.log('[SUCCESS] Fetched PvP and PvE players');
		}
		catch (err) {
			console.error(`[ERROR] ${err}`);
			await interaction.reply('Something went wrong! Try again later.');
			return;
		}

		const pvePlayersFiltered = pvePlayers.filter((pvePlayer) => {
			return !pvpPlayers.some((pvpPlayer) => {
				return pvpPlayer.userId === pvePlayer.userId;
			});
		});

		// Prepare the reply message
		let replyMessage = '## Mga Players Kahapon\n';
		replyMessage += '### PvP Players Kahapon:\n';
		pvpPlayers.forEach((player) => {
			replyMessage += `:thumbsup: ${player.username}\n`;
		});

		replyMessage += '\n';

		replyMessage += '### PvE lang kahapon:\n';
		pvePlayersFiltered.forEach((player) => {
			replyMessage += `:hand_with_index_finger_and_thumb_crossed_tone5: ${player.username}\n`;
		});

		await interaction.reply(replyMessage);
	},
};