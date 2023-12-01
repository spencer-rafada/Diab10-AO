const { Events } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const serverId = client.guilds.cache.first().id;

		try {
			await mongoose.connect(`${process.env.MONGODB_URI}/${serverId}` || '');
		}
		catch (err) {
			console.log(`[ERROR] Failed to connect to MongoDB: ${err}`);
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};