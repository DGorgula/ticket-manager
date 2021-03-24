import React from 'react'
import Ticket from './Ticket.js'

function Search({ tickets, setTickets, filterTickets }) {
    console.log(tickets);
    const ticketElements = tickets.map((ticket, index) => {
        return (
            <Ticket key={index} title={ticket.title} content={ticket.content} userEmail={ticket.userEmail} creationTime={ticket.creationTime} labels={ticket.labels} />
        )
    })


    return (
        // <div className="search-container">
        <>
            <input id="searchInput" type="text" placeholder="Search" onChange={filterTickets} />
            {ticketElements}
        </>
        // </div>
    )
}

export default Search
