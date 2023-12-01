const { Events } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		try {
			await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.TARGET_ENV}` || '');
		}
		catch (err) {
			console.log(`[ERROR] Failed to connect to MongoDB: ${err}`);
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};