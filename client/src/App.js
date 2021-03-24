import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search.js'
import "./App.css";

function App() {
  const [serverErrorPage, setServerErrorPage] = useState(false);
  const [ticketsState, setTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  useEffect(() => {
    axios.get('/api/tickets')
      .then(({ data: allTickets }) => {
        setTickets(allTickets);
      })
      .catch(err => {
        return setServerErrorPage(true)
      })
  }, [])

  const filterTickets = (target) => {
    const inputValue = target.target.value;
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
    <div className="App">
      <h1 className="title">Your Ticket Manager</h1>
      <Search tickets={ticketsState} setTickets={setTickets} filterTickets={filterTickets} hideTicket={hideTicket} hiddenTickets={hiddenTickets} restoreHiddenTickets={restoreHiddenTickets} />
    </div>
  );
}

export default App;
