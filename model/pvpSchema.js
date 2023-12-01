const mongoose = require('mongoose');

const pvpSchema = new mongoose.Schema({
	username: { type: String, required: true },
	userId: { type: String, required: true },
	count: { type: Number, default: 0 },
	date: { type: Date, default: Date.now },
	guildId: { type: String, required: true },
});

module.exports = mongoose.model('pvp', pvpSchema, 'pvp');