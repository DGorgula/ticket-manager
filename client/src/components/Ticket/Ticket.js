import React, { useState } from 'react'
import './Ticket.css';

function Ticket({ id, done, createLabelsElements, hiddenTickets, hideChosenTicket, title, content, userEmail, creationTime, labels, updateTicketLabels, toggleDoneMark }) {
    const shortContent = content.slice(0, 120);
    const [ticketContentState, setContentState] = useState(shortContent)
    const [input, setInput] = useState("")
    const [chosenTicket, setChosenTicket] = useState("")

    // hides tickets marked as hidden 
    if (hiddenTickets.includes(id)) {
        return "";
    }

    // converts date format
    const prettifiedDate = (creationTime) => {
        return new Date(creationTime).toISOString().slice(0, 19).replace("T", " ");
    }

    // on enter creates new Label
    const inputKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value;
            updateTicketLabels(e, value, labels, id, true);
            setInput("")
        }

    }

    // gets ticket content format, defers between full content and shortened
    const ticketContent = () => {
        if (ticketContentState === content) {
            return (
                <p className="ticket-content">{ticketContentState}</p>
            )
        }
        return (
            <p className="ticket-content">{ticketContentState} . . .<br />
                <span id="show" onClick={() => { setContentState(content); setChosenTicket(" more"); }}> show more</span>
            </p>
        )
    }

    // label-adder event handler to create new-label name input
    const showInput = (e) => {
        const leftPosition = e.target.getBoundingClientRect().left;
        const topPosition = e.target.getBoundingClientRect().top;
        const parent = e.target.parentElement;
        const parentLeft = parent.getBoundingClientRect().left;
        const parentTop = parent.getBoundingClientRect().top;
        console.log(parent);
        setInput(< input className="label-adder-input" placeholder="add new label" autoFocus onBlur={() => setInput("")} onKeyPress={inputKeyPressHandler} style={{ left: leftPosition - parentLeft + 10, top: topPosition - parentTop - 20 }} />)
    }

    // gets the svg with the appropriate class name and event handler arguments.
    const showDone = () => {
        if (done) {
            return (
                <svg className="ticket-done-button done" alt="ticket done" onClick={() => { toggleDoneMark(id, true) }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
            )
        }
        return (
            <svg className="ticket-done-button" alt="ticket undone" onClick={() => { toggleDoneMark(id, false) }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
        );
    }

    if (chosenTicket) {
        return (
            <div id="more-background" onClick={() => { setChosenTicket(""); setContentState(shortContent) }}>

                <div className={`ticket${chosenTicket}`} onClick={(e) => e.stopPropagation()}>
                    <div className="ticket-header">
                        {showDone()}

                        <span className="close-ticket-button" onClick={() => { setChosenTicket(""); setContentState(shortContent) }}>x</span>
                        <img alt="button to hide ticket" className="hideTicketButton" src='./assets/hide.webp' onClick={() => hideChosenTicket(id)} />
                        <span className="creation-time">{prettifiedDate(creationTime)}</span>
                        <h3 className="ticket-title">{title}</h3>
                        <span className="user-email">{userEmail}</span>
                    </div>
                    <div className="ticket-labels">{createLabelsElements(labels, true, id)}
                        <img alt="button to add label" className="label-adder" src="./assets/plus.png" onClick={showInput} />
                        {input}

                    </div>
                    {ticketContent()}
                </div >
            </div >
        )
    }
    return (
        <div className={`ticket${chosenTicket}`} onDoubleClick={() => { setContentState(content); setChosenTicket(" more"); }}>
            <div className="ticket-header">
                {showDone()}
                <span className="close-ticket-button" onClick={() => { setChosenTicket(""); setContentState(shortContent) }}>x</span>
                <img alt="" className="hideTicketButton" src='./assets/hide.webp' onClick={() => hideChosenTicket(id)} />
                <span className="creation-time">{prettifiedDate(creationTime)}</span>
                <h3 className="ticket-title">{title}</h3>
                <span className="user-email">{userEmail}</span>
            </div>
            <div className="ticket-labels">{createLabelsElements(labels, true, id)}
                <img alt="" className="label-adder" src="./assets/plus.png" onClick={showInput} />
                {input}

            </div>
            {ticketContent()}
        </div >

    )

}

export default Ticket;