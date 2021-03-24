import React from 'react'
import Ticket from './Ticket.js'

function Search({ restoreHiddenTickets, hiddenTickets, tickets, setTickets, filterTickets, hideTicket }) {
    console.log(tickets);
    const ticketElements = tickets.map((ticket, index) => {
        return (
            <Ticket key={index} id={ticket._id || ticket.id} title={ticket.title} content={ticket.content} userEmail={ticket.userEmail} creationTime={ticket.creationTime} labels={ticket.labels} hideTicket={hideTicket} hiddenTickets={hiddenTickets} />
        )
    });
    const showHiddenTicketsCounter = () => {
        if (hiddenTickets.length === 0) {
            return "";
        }
        return (<><p >There are <span className="hideTicketsCounter">{hiddenTickets.length}</span> hidden tickets</p>
            <button id="restoreHideTickets" value="restore" onClick={restoreHiddenTickets}></button></>);
    }
    return (
        // <div className="search-container">
        <>
            <input id="searchInput" type="text" placeholder="Search" onChange={filterTickets} />
            {showHiddenTicketsCounter()}
            {ticketElements}
        </>
        // </div>
    )
}

export default Search
