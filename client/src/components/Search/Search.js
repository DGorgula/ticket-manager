import React from 'react';
import Ticket from '../Ticket/Ticket';
import './Search.css';

function Search({ createLabelsElements, restoreHiddenTickets, hiddenTickets, tickets, filterTickets, hideChosenTicket, updateTicketLabels, labelObjectList, toggleDoneMark }) {

    // creates all ticket components
    const ticketElements = tickets.map((ticket, index) => {
        return (
            <Ticket key={index} id={ticket._id || ticket.id} title={ticket.title} done={ticket.done} createLabelsElements={createLabelsElements} content={ticket.content} userEmail={ticket.userEmail} creationTime={ticket.creationTime} labels={ticket.labels} hideChosenTicket={hideChosenTicket} hiddenTickets={hiddenTickets} updateTicketLabels={updateTicketLabels} toggleDoneMark={toggleDoneMark} />
        )
    });

    // shows hidden tickets counter if exist
    const showHiddenTicketsCounter = () => {
        if (hiddenTickets.length === 0) {
            return "";
        }
        return (
            <p id="restore">There are <span id="hideTicketsCounter">{hiddenTickets.length}</span> hidden tickets
                <span id="restoreHideTickets" onClick={restoreHiddenTickets}>restore</span>
            </p>
        );
    }

    // convert labels object to label-names array
    const labelList = labelObjectList.map((labelObject) => {
        return labelObject.name;
    });

    // creates a div with ticket labels
    const labelElementsDiv = <div id="label-list">
        {createLabelsElements(labelList)}
    </div>

    return (
        <>
            <input id="searchInput" type="text" placeholder="Search" onChange={filterTickets} />
            {showHiddenTicketsCounter()}
            <br />
            {labelElementsDiv}
            <div id="tickets-container">
                {ticketElements}
            </div>
        </>
    )
}

export default Search
