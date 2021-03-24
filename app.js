const express = require("express");
const app = express();
const morgan = require("morgan");
// const assert = require("assert");
const Ticket = require("./mongo.js");

// app.use(express.static("client/build"));
app.use(express.static("client/public"));
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (request, response, next) => {
    response.sendFile('index.html');
})

app.get('/api/tickets', (request, response, next) => {
    const { searchText } = request.query;
    Ticket.find({ title: { $regex: searchText || '', $options: 'i' } })
        .then(allTickets => {
            allTickets.map((ticket) => {
            })
            return response.json(allTickets);
        })
        .catch(err => next(err));
});

app.patch('/api/tickets/:ticketId/done', async (request, response, next) => {
    const { ticketId } = request.params;
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { done: true }, { new: true })
        return response.json({ updated: true })
    }
    catch (error) {
        return next(error);
    }
});

app.patch('/api/tickets/:ticketId/undone', async (request, response, next) => {
    try {
        const { ticketId } = request.params;
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { done: false }, { new: true })
        return response.json({ updated: true })
    }
    catch (error) {
        return next(error);
    }
});

const errorHandler = (error, request, response, next) => {
    console.log("error handler output: ", error);
    return response.json({ error: error.message })
}

const lastRoute = (request, response, next) => {
    console.log("request missed all routes");
    return response.status(404).send("not found");
}
app.use(lastRoute);
app.use(errorHandler);

module.exports = app;
