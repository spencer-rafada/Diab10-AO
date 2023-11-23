const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pve')
		.setDescription('Keep track of all the people who did PvE today!'),
	async execute(interaction) {
		// Your code here
		const message = await interaction.reply({ content: 'PvE!', fetchReply: true });
		message.react('👍');

		const filter = (reaction, user) => {
			return reaction.emoji.name === '👍';
		};

		const collector = message.createReactionCollector({ filter });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
		});
	},
};