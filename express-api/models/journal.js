const mongoose = require("mongoose")

const journalSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
    },
    journals: [
        {
            question: String,
            answer: String,
        }
    ]
})

module.exports = mongoose.model("GridJournal", journalSchema, "GridJournal");