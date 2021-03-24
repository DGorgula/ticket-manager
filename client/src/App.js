import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search.js'
import "./App.css";

function App() {
  const [ticketsState, setTickets] = useState([]);
  useEffect(() => {
    axios.get('/api/tickets')
      .then(({ data: allTickets }) => {
        setTickets(allTickets);
      });
  }, [])

  const filterTickets = (target) => {
    // if (target.charCode !== 13) {
    //   return;
    // }
    const inputValue = target.target.value;
    axios.get(`/api/tickets?searchText=${inputValue}`)
      .then(({ data: filteredTickets }) => {

        if ("error" in filteredTickets) {
          console.log("there was an error");
          return;
        }
        return setTickets(filteredTickets)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <h1 className="title">Your Ticket Manager</h1>
      <Search tickets={ticketsState} setTickets={setTickets} filterTickets={filterTickets} />
    </div>
  );
}

export default App;
