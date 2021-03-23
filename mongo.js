const mongoose = require("mongoose");


const ticketSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    creationTime: {
        type: Date,
        default: new Date()
    },
    labels: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)