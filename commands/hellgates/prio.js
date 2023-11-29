const { SlashCommandBuilder } = require('discord.js');
const pvpSchema = require('../../model/pvpSchema.js');
const pveSchema = require('../../model/pveSchema.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prio')
		.setDescription('Sino mga prio ngayon?'),
	async execute(interaction) {
		const pvePlayers = await pveSchema.find({ date: { $gte: new Date().setDate(new Date().getDate() - 1) } });
		const pvpPlayers = await pvpSchema.find({ date: { $gte: new Date().setDate(new Date().getDate() - 1) } });
		const pvePlayersFiltered = pvePlayers.filter((pvePlayer) => {
			return !pvpPlayers.some((pvpPlayer) => {
				return pvpPlayer.userId === pvePlayer.userId;
			});
		});

		// TODO: Show component
	},
};