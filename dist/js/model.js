"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var InfoSchema = new Schema({
    date: Date,
    taku: String,
    tenhou_ids: String,
    scores: String,
    time: Number,
    mjlog: String
});
exports.Info = mongoose.model('Info', InfoSchema);
