


function Ticket({ title, content, userEmail, creationTime, labels }) {
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

    return (
        <div className="ticket">
            <h3 className="ticket-title">{title}</h3>
            <p className="ticket-content">{content}</p>
            <p className="ticket-signature"><span className="user-email">{userEmail}</span>|<span className="creationTime">{creationTime}</span></p>
            <div className="ticket-labels">{labelsElements()}</div>
        </div>
    )

}

export default Ticket;