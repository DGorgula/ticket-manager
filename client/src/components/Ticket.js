import React, { useState } from 'react'
import '../styles/Ticket.css';

function Ticket({ id, getLabelsElements, hiddenTickets, hideTicket, title, content, userEmail, creationTime, labels, addToCurrentLabels }) {
    const shortContent = content.slice(0, 120);
    const [ticketContent, setContent] = useState(shortContent)
    const [input, setInput] = useState("")


    const prettifiedDate = (creationTime) => {
        return new Date(creationTime).toISOString().slice(0, 19).replace("T", " ");
    }
    const showMore = <span id="show" onClick={() => setContent(content)}> show more</span>;
    const showLess = <span id="show" onClick={() => setContent(shortContent)}> show less</span>;

    if (hiddenTickets.includes(id)) {
        return "";
    }

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value;
            addToCurrentLabels(value, labels, id);
            setInput("")
        }

    }




    const showInput = (e) => {
        const leftPosition = e.target.getBoundingClientRect().left;
        const topPosition = e.target.getBoundingClientRect().top;
        const parent = e.target.parentElement;
        const parentLeft = parent.getBoundingClientRect().left;
        const parentTop = parent.getBoundingClientRect().top;
        console.log(parent);
        setInput(< input className="label-adder-input" placeholder="add new label" onKeyPress={keyPressHandler} style={{ left: leftPosition - parentLeft + 10, top: topPosition - parentTop - 20 }} />)
    }

    return (
        <div className="ticket">
            <img className="hideTicketButton" src='./assets/hide.webp' onClick={() => hideTicket(id)} />
            <span className="creation-time">{prettifiedDate(creationTime)}</span>
            <h3 className="ticket-title">{title}</h3>
            <span className="user-email">{userEmail}</span>
            <div className="ticket-labels">{getLabelsElements(labels)}
                <img className="label-adder" src="./assets/plus.png" onClick={showInput} />
                {input}

            </div>
            <p className="ticket-content">{ticketContent}{ticketContent === content ? showLess : showMore}</p>
        </div>
    )

}

export default Ticket;