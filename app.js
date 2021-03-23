const express = require("express");
const app = express();
const Ticket = require("./mongo.js");

app.use(express.static("client/build"));
app.use(express.json());

app.get('/api/tickets', async (request, response, next) => {
    const { searchText } = request.query;
    const allTickets = await Ticket.find({ title: { $regex: searchText, $options: "i" } });


    return response.json(allTickets);
});

app.patch('/api/tickets/:ticketId', async (request, response, next) => {

    return response.json({ updated: true })
});

app.patch('/api/tickets/:ticketId', async (request, response, next) => {
    const { ticketId } = request.params;
    const ticketToUpdate = Ticket.findOneAndUpdate({ _id: ticketId }, { done: true })
    console.log(ticketToUpdate);
    return response.json({ updated: true })
});

const errorHandler = (error, request, response, next) => {
    console.log("error handler output: ", error);
    return response.json({ error: error.message })
}

const lastRoute = (request, response, next) => {
    console.log("request missed all routes, the path was: ", request.path);
}
app.use(lastRoute);
app.use(errorHandler);

module.exports = app;
