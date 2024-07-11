import { useEffect, useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './App.css';

const ENDPOINT = "http://127.0.0.1:5000"; // Flask server endpoint

function App() {
  const [httpResponse, setHttpResponse] = useState("");
  const [socketResponse, setSocketResponse] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // HTTP request to Flask server
    axios.get(`${ENDPOINT}/api/data`)
      .then(response => {
        setHttpResponse(response.data.message);
      })
      .catch(error => {
        console.error("There was an error making the request!", error);
      });

    // Socket.IO connection
    const socket = socketIOClient(ENDPOINT);
    socket.on("message", data => {
      setSocketResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.send(message);
    setMessage("");
  };

  return (
    <div>
      <h1>React and Flask Communication</h1>
      <div>
        <h2>HTTP Response</h2>
        <p>{httpResponse}</p>
      </div>
      <div>
        <h2>Socket.IO Response</h2>
        <p>{socketResponse}</p>
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
