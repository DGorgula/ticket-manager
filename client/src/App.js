import React, { useState, useEffect } from 'react';
import axios from 'axios';
import randomColor from 'randomcolor';
import Search from './components/Search.js'
import Label from './components/Label.js'
import "./App.css";

function App() {
  const [serverErrorPage, setServerErrorPage] = useState(false);
  const [ticketsState, setTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [labelObjectList, setlabelObjectList] = useState([]);
  const [chosenLabels, setChosenLabels] = useState([]);
  const [inputValueState, setInputValue] = useState("");


  // first data http requests in componentDidMount
  useEffect(() => {
    getLabelsFromServer();
    filterTickets(null, inputValueState);
  }, [])

  // http request to update tickets when labels are chosed.
  useEffect(() => {
    filterTickets(null, inputValueState);
  }, [chosenLabels])



  if (serverErrorPage) {
    return (
      <div id="server-error">
        <div id="server-error-text">
          <h3 id="server-error-title">Oopsy Daisy...</h3>
          <p>There is a problem with our server.</p>
        </div>
        <div id="server-error-images">
          <img alt="fox's z sleep signs" id="zzz" src="./assets/zzz.png" />
          <img alt="cute fox sleeps marking server error" id="foxy" src="./assets/server-down-foxy.png" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="App">
        <h1 className="title">Your Ticket Manager</h1>
        <Search tickets={ticketsState} setTickets={setTickets} filterTickets={filterTickets} hideChosenTicket={hideChosenTicket} hiddenTickets={hiddenTickets} restoreHiddenTickets={restoreHiddenTickets} createLabelsElements={createLabelsElements} updateTicketLabels={updateTicketLabels} labelObjectList={labelObjectList} toggleDoneMark={toggleDoneMark} />
      </div>
      <div id="oopsy-loader">
        <img alt="" id="zzz-loader" src="./assets/zzz.png" />
        <img alt="" id="foxy-loader" src="./assets/server-down-foxy.png" />
      </div>
    </>
  );

  //    HTTP Request functions:
  // ===============================

  // gets all tickets filtered both by the input value and chosen labels
  function filterTickets(event, value) {
    return new Promise((resolve, reject) => {

      let inputValue;
      if (value != null) {
        inputValue = value;
      }
      else {
        inputValue = event.target.value;
      }
      setInputValue(inputValue);
      axios.get(`/api/tickets?searchText=${inputValue}&labels=${chosenLabels}`)
        .then(({ data: filteredTickets }) => {
          if ("error" in filteredTickets) {
            reject("there was an error");
          }
          setTickets(filteredTickets);
          resolve();
        })
        .catch(err => {
          setServerErrorPage(true)
          reject();
        })
    })
  }

  // gets all labels exist from server
  function getLabelsFromServer() {
    axios.get('/api/labels')
      .then(({ data: allLabelObjects }) => {
        console.log(allLabelObjects);
        filterTickets(null, inputValueState)
          .then(result => {
            setlabelObjectList(allLabelObjects);
          })
          .catch(err => { console.log(err); })
      })
      .catch(err => {
        console.log("error to load labels");
      })
  }

  // removes a label from all tickets and from the label list
  function removeLabelFromAll(e, label) {
    e.stopPropagation();
    axios.delete(`/api/labels/remove/${label}`)
      .then(result => {
        getLabelsFromServer();
      })
      .catch(err => { console.log(err); })
  }

  // gets the label background color if exist, else creates one and gets the server updated
  function getLabelBackroundColor(label) {
    const labelExist = labelObjectList.filter(labelObject => {
      return labelObject.name === label;
    })
    if (labelExist[0]) {
      return labelExist[0].color;
    }
    const newLabel = {
      name: label,
      color: randomColor()
    };
    labelObjectList.push(newLabel);
    setlabelObjectList([...labelObjectList]);
    try {
      axios.post('/api/labels/new', newLabel);
    }
    catch (error) { console.log("error uploading label to db: ", error); }
    return newLabel.color;
  }

  // updates ticket labels for both adding and removing ticket label
  function updateTicketLabels(e, label, labels, id, addFlag) {
    console.log(e, label, labels, id, addFlag);
    e.stopPropagation();

    if (addFlag) {
      labels.push(label)
    }
    else {
      const labelIndex = labels.indexOf(label);
      labels.splice(labelIndex, 1);
      console.log(labels);
    }
    axios.patch('/api/tickets/update-labels', { labels: labels, id: id }).then(({ data: response }) => {
      if (response.label) {
        labels.pop();
        labels.push(response.label)
        setTickets([...ticketsState]);
        return;
      }
      setTickets([...ticketsState]);
      return;
    }).catch((err) => { console.log("error updating new label"); })
  }

  // marks chosen ticket as done or done
  function toggleDoneMark(ticketId, isDone) {
    if (isDone) {
      axios.patch(`/api/tickets/${ticketId}/undone`)
        .then(response => {
          filterTickets(null, inputValueState);
        })
        .catch(error => console.log("error marking as undone", error))
      return;
    }
    axios.patch(`/api/tickets/${ticketId}/done`)
      .then(response => {
        filterTickets(null, inputValueState);
      })
      .catch(error => console.log("error marking as done", error))
  }
  //    Event handlers:
  // ===============================

  // hides chosen ticket
  function hideChosenTicket(ticketId) {
    console.log("giding a ticket", ticketId);
    if (hiddenTickets.includes(ticketId)) {
      hiddenTickets.remove(ticketId);
      return setHiddenTickets(hiddenTickets.slice());
    }
    hiddenTickets.push(ticketId);
    return setHiddenTickets(hiddenTickets.slice());
  }

  // restores all hidden tickets
  function restoreHiddenTickets() {
    return setHiddenTickets([]);
  }

  // chooses or unchooses label
  function toggleLabelChoose(label) {
    if (chosenLabels.includes(label)) {
      const labelIndex = chosenLabels.indexOf(label);
      chosenLabels.splice(labelIndex, 1);
      setChosenLabels([...chosenLabels])
      return;
    }
    setChosenLabels([...chosenLabels, label])
  }


  // 
  // creates a label component for each label given both for main labels and ticket labels
  function createLabelsElements(labels, isTicketLabel, ticketId) {
    if (!labels) {
      return "";
    }
    let chosenExist;
    if (chosenLabels[0]) {
      chosenExist = true
    }
    return labels.map((label, index) => {
      const isChosen = chosenLabels.includes(label);
      const labelBackgroundColor = chosenExist ? (isChosen ? getLabelBackroundColor(label) : 'lightgray') : getLabelBackroundColor(label);
      return (
        <Label key={index} toggleLabelChoose={toggleLabelChoose} label={label} labels={labels} ticketId={ticketId} isTicketLabel={isTicketLabel} labelBackgroundColor={labelBackgroundColor} getLabelBackroundColor={getLabelBackroundColor} updateTicketLabels={updateTicketLabels} removeLabelFromAll={removeLabelFromAll} />
      );
    });
  }






}

export default App;
