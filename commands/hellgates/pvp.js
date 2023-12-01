const { SlashCommandBuilder } = require('discord.js');
const pvpSchema = require('../../model/pvpSchema.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pvp')
		.setDescription('Add user to tally of people who did PvP today!')
		.addUserOption(option =>
			option.setName('user').setDescription('Sino ang nag PvP?').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const serverId = interaction.guild.id;
		// console.log(user);
		let existingUser;

		try {
			existingUser = await pvpSchema.findOne({ guildId: serverId, userId: user.id });
		}
		catch (err) {
			console.error(`[ERROR] Failed to find user: ${err}`);
			await interaction.reply('Something went wrong! Try again later.');
		}

		if (existingUser) {
			existingUser.count += 1;
			existingUser.date = new Date();
			existingUser.username = user.username;

			try {
				await existingUser.save();
				console.log(`[SUCCESS] Updated user: ${existingUser.username}`);
			}
			catch (err) {
				console.error(`[ERROR] Failed to update user: ${err}`);
				await interaction.reply('Something went wrong! Try again later.');
			}
		}
		else {
			try {
				await new pvpSchema({
					username: user.username,
					userId: user.id,
					count: 1,
					guildId: serverId,
				}).save();
				console.log(`[SUCCESS] Saved user: ${user.username}`);
			}
			catch (err) {
				console.error(`[ERROR] Failed to save user: ${err}`);
				await interaction.reply('Something went wrong! Try again later.');
			}
		}

		await interaction.reply(`${user} ay nag PvP ngayon!`);
	},
};