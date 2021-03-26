import React from 'react';
import Ticket from './Ticket.js';
import '../styles/Search.css';

function Search({ getLabelsElements, restoreHiddenTickets, hiddenTickets, tickets, setTickets, filterTickets, hideTicket, addToCurrentLabels }) {
    const ticketElements = tickets.map((ticket, index) => {
        return (
            <Ticket key={index} id={ticket._id || ticket.id} title={ticket.title} getLabelsElements={getLabelsElements} content={ticket.content} userEmail={ticket.userEmail} creationTime={ticket.creationTime} labels={ticket.labels} hideTicket={hideTicket} hiddenTickets={hiddenTickets} addToCurrentLabels={addToCurrentLabels} />
        )
    });
    const showHiddenTicketsCounter = () => {
        if (hiddenTickets.length === 0) {
            return "";
        }
        return (<p id="restore">There are <span id="hideTicketsCounter">{hiddenTickets.length}</span> hidden tickets
            <span id="restoreHideTickets" onClick={restoreHiddenTickets}>restore</span>
        </p>
        );
    }
    return (
        <>
            <input id="searchInput" type="text" placeholder="Search" onChange={filterTickets} />
            {showHiddenTicketsCounter()}
            <div id="tickets-container">
                {ticketElements}
            </div>
        </>
    )
}

export default Search
