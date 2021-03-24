const express = require("express");
const app = express();
const morgan = require("morgan");
const { Ticket, Label } = require("./mongo.js");

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

app.post('/api/labels/new', async (request, response, next) => {
    const { name, color } = request.body;
    console.log("LABELLLLLLLL: ", name, color);
    try {
        const label = new Label({
            name: name,
            color: color
        })
        await label.save();
        return response.json({ updated: true })
    }
    catch (err) { return next(err) }

})

app.get('/api/labels', async (request, response, next) => {
    try {
        const labels = await Label.find();
        response.json(labels);
    }
    catch (err) { return next(err) }
});

app.delete('/api/labels', async (request, response, next) => {
    try {

        const deleted = await Label.deleteMany({}, { new: true });
        return response.json({ deleted: detected.deletedCount })
    }
    catch (err) { return next(err) }
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
