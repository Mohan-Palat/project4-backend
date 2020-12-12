const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        id: {type: Number},
        artist: {type: String},
        title: {type: String},
        timestamp:{type: Number},
        createdOn:{type: Date},
    },
    {collection: 'song-test'}
)


module.exports = mongoose.model("Song", songSchema)