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

  return (
    <div className="App">
      <h1 className="title">Your Ticket Manager</h1>
      <Search tickets={ticketsState} setTickets={setTickets} />
    </div>
  );
}

export default App;
