const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config.json');
const pveSchema = require('../model/pveSchema');

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

		setTimeout(async () => {
			await new pveSchema({ username: 'Test', userId: '123' }).save();
		}, 2000);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};