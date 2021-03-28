import React, { useState } from 'react'
import '../styles/Ticket.css';

function Ticket({ id, done, getLabelsElements, hiddenTickets, hideTicket, title, content, userEmail, creationTime, labels, updateTicketLabels, toggleDoneMark }) {
    const shortContent = content.slice(0, 120);
    const [ticketContent, setContent] = useState(shortContent)
    const [input, setInput] = useState("")
    const [more, setMore] = useState("")


    const prettifiedDate = (creationTime) => {
        return new Date(creationTime).toISOString().slice(0, 19).replace("T", " ");
    }
    const showMore = <span id="show" onClick={() => { setContent(content); setMore(" more"); }}> show more</span>;
    const showLess = <span id="show" onClick={() => setContent(shortContent)}> show less</span>;

    if (hiddenTickets.includes(id)) {
        return "";
    }

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value;
            updateTicketLabels(e, value, labels, id, true);
            setInput("")
        }

    }

    const ticketContentCreator = () => {
        if (ticketContent === content) {
            return (
                <p className="ticket-content">{ticketContent}</p>
            )
        }
        return (
            <p className="ticket-content">{ticketContent} . . .<br />{showMore}</p>
        )
    }


    const showInput = (e) => {
        const leftPosition = e.target.getBoundingClientRect().left;
        const topPosition = e.target.getBoundingClientRect().top;
        const parent = e.target.parentElement;
        const parentLeft = parent.getBoundingClientRect().left;
        const parentTop = parent.getBoundingClientRect().top;
        console.log(parent);
        setInput(< input className="label-adder-input" placeholder="add new label" autoFocus onBlur={() => setInput("")} onKeyPress={keyPressHandler} style={{ left: leftPosition - parentLeft + 10, top: topPosition - parentTop - 20 }} />)
    }

    const showDone = () => {
        if (done) {
            return (
                <svg className="ticket-done-button done" onClick={() => { toggleDoneMark(id, true) }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
            )
        }
        return (
            <svg className="ticket-done-button" onClick={() => { toggleDoneMark(id, false) }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
        );
    }
    if (more) {
        return (
            <div id="more-background" onClick={() => { setMore(""); setContent(shortContent) }}>

                <div className={`ticket${more}`} onClick={(e) => e.stopPropagation()}>
                    <div className="ticket-header">
                        {showDone()}

                        <span className="close-ticket-button" onClick={() => { setMore(""); setContent(shortContent) }}>x</span>
                        <img className="hideTicketButton" src='./assets/hide.webp' onClick={() => hideTicket(id)} />
                        <span className="creation-time">{prettifiedDate(creationTime)}</span>
                        <h3 className="ticket-title">{title}</h3>
                        <span className="user-email">{userEmail}</span>
                    </div>
                    <div className="ticket-labels">{getLabelsElements(labels, true, id)}
                        <img className="label-adder" src="./assets/plus.png" onClick={showInput} />
                        {input}

                    </div>
                    {ticketContentCreator()}
                </div >
            </div >
        )
    }
    return (
        <div className={`ticket${more}`} onDoubleClick={() => { setContent(content); setMore(" more"); }}>
            <div className="ticket-header">
                {showDone()}
                <span className="close-ticket-button" onClick={() => { setMore(""); setContent(shortContent) }}>x</span>
                <img className="hideTicketButton" src='./assets/hide.webp' onClick={() => hideTicket(id)} />
                <span className="creation-time">{prettifiedDate(creationTime)}</span>
                <h3 className="ticket-title">{title}</h3>
                <span className="user-email">{userEmail}</span>
            </div>
            <div className="ticket-labels">{getLabelsElements(labels, true, id)}
                <img className="label-adder" src="./assets/plus.png" onClick={showInput} />
                {input}

            </div>
            { ticketContentCreator()}
        </div >

    )

}

export default Ticket;