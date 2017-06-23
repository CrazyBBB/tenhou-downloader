import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
	date: Date,
	taku: String,
    tenhou_ids: String,
    scores: String,
    time: Number,
    mjlog: String
});

export const Info = mongoose.model('Info', InfoSchema);
