import React, { useState, useEffect } from 'react';
import axios from 'axios';
import randomColor from 'randomcolor';
import Search from './components/Search.js'
import "./App.css";

function App() {
  const [serverErrorPage, setServerErrorPage] = useState(false);
  const [ticketsState, setTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [labelObjectList, setlabelObjectList] = useState([]);
  const [currentLabels, setCurrentLabels] = useState([]);
  const [inputValueState, setInputValue] = useState("");


  const getLabelsFromServer = () => {
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
        return
        // if (condition) {

        // }
        console.log("error to load labels");
      })
  }

  useEffect(() => {
    getLabelsFromServer();
  }, [])


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
      axios.get(`/api/tickets?searchText=${inputValue}&labels=${currentLabels}`)
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


  useEffect(() => {
    filterTickets(null, inputValueState);
  }, [currentLabels])

  const hideTicket = (ticketId) => {
    console.log("giding a ticket", ticketId);
    if (hiddenTickets.includes(ticketId)) {
      hiddenTickets.remove(ticketId);
      return setHiddenTickets(hiddenTickets.slice());
    }
    hiddenTickets.push(ticketId);
    return setHiddenTickets(hiddenTickets.slice());
  }

  const restoreHiddenTickets = () => {
    return setHiddenTickets([]);
  }

  const toggleLabelChoose = (label) => {
    if (currentLabels.includes(label)) {
      const labelIndex = currentLabels.indexOf(label);
      currentLabels.splice(labelIndex, 1);
      setCurrentLabels([...currentLabels])
      return;
    }
    setCurrentLabels([...currentLabels, label])
  }

  const removeLabelFromAll = (e, label) => {
    e.stopPropagation();
    axios.delete(`/api/labels/remove/${label}`)
      .then(result => {
        getLabelsFromServer();
      })
      .catch(err => { console.log(err); })
  }

  const getLabelsElements = (labels, isTicketLabel, ticketId) => {
    if (!labels) {
      return "";
    }
    let chosenExist;
    if (currentLabels[0]) {
      chosenExist = true
    }
    return labels.map((label, index) => {
      const isChosen = currentLabels.includes(label);
      const labelBackgroundColor = chosenExist ? (isChosen ? getLabelBackroundColor(label) : 'lightgray') : getLabelBackroundColor(label);
      return (
        <span key={index} className={`label-span`} onClick={() => { toggleLabelChoose(label); console.log(currentLabels) }} style={{ backgroundColor: isTicketLabel ? getLabelBackroundColor(label) : labelBackgroundColor }}><span className='label'>{label}</span> <span className="label-deleter" onClick={(e) => {
          if (isTicketLabel) {
            updateTicketLabels(e, label, labels, ticketId)
          }
          else {
            removeLabelFromAll(e, label)
          }
        }}>x</span></span>
      );
    });
  }

  const getLabelBackroundColor = (label) => {
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


  const updateTicketLabels = (e, label, labels, id, addFlag) => {
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
  if (serverErrorPage) {
    return (
      <div id="server-error">
        <div id="server-error-text">
          <h3 id="server-error-title">Oopsy Daisy...</h3>
          <p>There is a problem with our server.</p>
        </div>
        <div id="server-error-images">
          <img id="zzz" src="./assets/zzz.png" />
          <img id="foxy" src="./assets/server-down-foxy.png" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="App">
        <h1 className="title">Your Ticket Manager</h1>
        <Search tickets={ticketsState} setTickets={setTickets} filterTickets={filterTickets} hideTicket={hideTicket} hiddenTickets={hiddenTickets} restoreHiddenTickets={restoreHiddenTickets} getLabelsElements={getLabelsElements} updateTicketLabels={updateTicketLabels} labelObjectList={labelObjectList} />
      </div>
      <div id="oopsy-loader">
        <img id="zzz-loader" src="./assets/zzz.png" />
        <img id="foxy-loader" src="./assets/server-down-foxy.png" />
      </div>
    </>
  );
}

export default App;
