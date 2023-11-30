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
		}

		const pvePlayersFiltered = pvePlayers.filter((pvePlayer) => {
			return !pvpPlayers.some((pvpPlayer) => {
				return pvpPlayer.userId === pvePlayer.userId;
			});
		});

		// TODO: Show component
	},
};