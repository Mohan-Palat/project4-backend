const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        id: {type: Number},
        artist: {type: String},
        title: {type: String},
        timestamp:{type: Number},
        createdOn:{type: Date},
    }
)


module.exports = mongoose.model("Song", songSchema)