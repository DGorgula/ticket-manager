
function Ticket({ id, getLabelsElements, hiddenTickets, hideTicket, title, content, userEmail, creationTime, labels }) {


    if (hiddenTickets.includes(id)) {
        return "";
    }
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <button className="hideTicketButton" onClick={() => hideTicket(id)} value="hide">hide</button>
            <p className="ticket-content">{content}</p>
            <p className="ticket-signature"><span className="user-email">{userEmail}</span>|<span className="creationTime">{creationTime}</span></p>
            <div className="ticket-labels">{getLabelsElements(labels)}</div>
        </div>
    )

}

export default Ticket;