const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        id: {type: Number},
        artist: {type: String},
        title: {type: String},
        timestamp:{type: Number},
        createdOn:{type: Date},
        year: {type: String},
        month: {type: String},
        date: {type: String},
        hours: {type: String},
        minutes: {type: String},
        seconds: {type: String},
    },
    {collection: 'song-test2'}
)


module.exports = mongoose.model("Song", songSchema)