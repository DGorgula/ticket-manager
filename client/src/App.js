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
  // const [inputValueState, setInputValue] = useState("")
  useEffect(() => {
    axios.get('/api/tickets')
      .then(({ data: allTickets }) => {
        setTickets(allTickets);
      })
      .catch(err => {
        return setServerErrorPage(true)
      })
    axios.get('/api/labels')
      .then(({ data: allLabelObjects }) => {
        console.log(allLabelObjects);
        setlabelObjectList(allLabelObjects);
      })
      .catch(err => {
        return console.log("error to load labels");
      })
  }, [])

  const filterTickets = (target) => {
    const inputValue = target.target.value;
    // setInputValue(inputValue);
    axios.get(`/api/tickets?searchText=${inputValue}`)
      .then(({ data: filteredTickets }) => {
        if ("error" in filteredTickets) {
          console.log("there was an error");
          return;
        }
        return setTickets(filteredTickets)
      })
      .catch(err => {
        return setServerErrorPage(true)
      })
  }

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

  const getLabelsElements = (labels) => {
    if (!labels) {
      return "";
    }
    return labels.map((label, index) => {
      return (
        <span key={index} className="label" onClick={() => { setCurrentLabels([...currentLabels, label]); console.log(currentLabels) }} style={{ backgroundColor: getLabelBackroundColor(label) }}>{label}</span>
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


  const addNewLabel = (label, labels, id) => {
    axios.patch('/api/tickets/new-label', { labels: labels, id: id }).then(({ data: response }) => {
      if (response.label) {
        labels.push(response.label)
        setTickets([...ticketsState]);
        return;
      }
      labels.push(label)
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
        <Search tickets={ticketsState} setTickets={setTickets} filterTickets={filterTickets} hideTicket={hideTicket} hiddenTickets={hiddenTickets} restoreHiddenTickets={restoreHiddenTickets} getLabelsElements={getLabelsElements} addNewLabel={addNewLabel} labelObjectList={labelObjectList} />
      </div>
      <div id="oopsy-loader">
        <img id="zzz-loader" src="./assets/zzz.png" />
        <img id="foxy-loader" src="./assets/server-down-foxy.png" />
      </div>
    </>
  );
}

export default App;
