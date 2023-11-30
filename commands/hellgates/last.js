const { SlashCommandBuilder } = require('discord.js');
const pvpSchema = require('../../model/pvpSchema.js');
const pveSchema = require('../../model/pveSchema.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('last')
		.setDescription('Kailan ka last nag PvE at PvP?')
		.addUserOption(option =>
			option.setName('user').setDescription('Paldo').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let pveInfo;
		let pvpInfo;

		try {
			pvpInfo = await pvpSchema.findOne({ userId: user.id });
			pveInfo = await pveSchema.findOne({ userId: user.id });
		}
		catch (err) {
			console.error(`[ERROR] Failed to find user: ${err}`);
			await interaction.reply('Something went wrong! Try again later.');
		}

		const replyMessage = `${user} last PvE: ${pveInfo?.date?.toDateString() || 'Wala pa'} - last PvP: ${pvpInfo?.date?.toDateString() || 'Wala pa'}`;

		await interaction.reply(replyMessage);
	},
};