import React, { useState } from 'react'
import '../styles/Ticket.css';

function Ticket({ id, getLabelsElements, hiddenTickets, hideTicket, title, content, userEmail, creationTime, labels }) {
    const shortContent = content.slice(0, 120);
    const [ticketContent, setContent] = useState(shortContent)


    const prettifiedDate = (creationTime) => {
        return new Date(creationTime).toISOString().slice(0, 19).replace("T", " ");
    }
    const showMore = <span id="show" onClick={() => setContent(content)}> show more</span>;
    const showLess = <span id="show" onClick={() => setContent(shortContent)}> show less</span>;

    if (hiddenTickets.includes(id)) {
        return "";
    }

    return (
        <div className="ticket">
            <img className="hideTicketButton" src='./assets/hide.webp' onClick={() => hideTicket(id)} />
            <span className="creation-time">{prettifiedDate(creationTime)}</span>
            <h3 className="ticket-title">{title}</h3>
            <span className="user-email">{userEmail}</span>
            <div className="ticket-labels">{getLabelsElements(labels)}</div>
            <p className="ticket-content">{ticketContent}{ticketContent === content ? showLess : showMore}</p>
        </div>
    )

}

export default Ticket;