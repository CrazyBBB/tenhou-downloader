const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Info = new Schema({
	date: Date,
	taku: String,
    tenhou_ids: String,
    scores: String,
    time: Number,
    mjlog: String
});

exports.Info = mongoose.model('Info', Info);