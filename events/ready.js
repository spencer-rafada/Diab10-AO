const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		try {
			await mongoose.connect(MONGODB_URI || '');
		}
		catch (err) {
			console.log(`[ERROR] Failed to connect to MongoDB: ${err}`);
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};