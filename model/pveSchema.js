const mongoose = require('mongoose');

const pveSchema = new mongoose.Schema({
	username: { type: String, required: true },
	userId: { type: String, required: true },
	count: { type: Number, default: 0 },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('pve', pveSchema, 'pve');