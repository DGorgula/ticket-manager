
function Ticket({ id, hiddenTickets, hideTicket, title, content, userEmail, creationTime, labels }) {
    const labelsElements = () => {
        if (labels) {
            return labels.map((label, index) => {
                return (
                    <span key={index} className="label">{label}</span>
                );
            });
        }
        else {
            return "";
        }
    }

    if (hiddenTickets.includes(id)) {
        return "";
    }
    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <button className="hideTicketButton" onClick={() => hideTicket(id)} value="hide">hide</button>
            <p className="ticket-content">{content}</p>
            <p className="ticket-signature"><span className="user-email">{userEmail}</span>|<span className="creationTime">{creationTime}</span></p>
            <div className="ticket-labels">{labelsElements()}</div>
        </div>
    )

}

export default Ticket;