const { SlashCommandBuilder } = require('discord.js');
const pveSchema = require('../../model/pveSchema.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pve')
		.setDescription('Add user to tally of people who did PvE today!')
		.addUserOption(option =>
			option.setName('user').setDescription('Sino ang nag PvE?').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		// console.log(user);

		const existingUser = await pveSchema.findOne({ username: user.username, userId: user.id });

		if (existingUser) {
			existingUser.count += 1;
			try {
				await existingUser.save();
				console.log(`[SUCCESS] Updated user: ${existingUser.username}`);
			}
			catch (err) {
				console.error(`[ERROR] Failed to update user: ${err}`);
			}
		}
		else {
			try {
				await new pveSchema({
					username: user.username,
					userId: user.id,
					count: 1,
				}).save();
				console.log(`[SUCCESS] Saved user: ${user.username}`);
			}
			catch (err) {
				console.error(`[ERROR] Failed to save user: ${err}`);
			}
		}
		await interaction.reply(`${user.username} ay nag PvE ngayon!`);
	},
};