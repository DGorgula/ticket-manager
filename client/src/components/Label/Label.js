import React from 'react'

function Label({ label, labels, ticketId, toggleLabelChoose, isTicketLabel, labelBackgroundColor, getLabelBackroundColor, updateTicketLabels, removeLabelFromAll }) {

    return (
        <span className={`label-span`} onClick={() => { toggleLabelChoose(label); }} style={{ backgroundColor: isTicketLabel ? getLabelBackroundColor(label) : labelBackgroundColor }}>
            <span className='label'>{label}</span>
            <span className="label-deleter" onClick={(e) => {
                isTicketLabel ? updateTicketLabels(e, label, labels, ticketId) : removeLabelFromAll(e, label)
            }}>x</span>
        </span>
    )
}

export default Label
