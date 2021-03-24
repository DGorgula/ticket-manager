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
});
const labelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});
const Ticket = mongoose.model('Ticket', ticketSchema);
const Label = mongoose.model('Label', labelSchema);
module.exports = { Ticket, Label };