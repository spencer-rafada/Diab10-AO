const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pve')
		.setDescription('Add user to tally of people who did PvE today!')
		.addUserOption(option =>
			option.setName('user').setDescription('Sino ang nag PvE?').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		console.log(user);
		// TODO: add user id and username to database and date of the command
		// respond with confirmation of all the information said above
		await interaction.reply(`${user.username} ay nag PvE ngayon!`);
	},
};