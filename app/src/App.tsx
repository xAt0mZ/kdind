import './App.css';
import { Header } from './components/Header/Header';

import { connect, send } from './api';
import { useEffect, useState } from 'react';
import { ChatHistory } from './components/ChatHistory/ChatHistory';

function App() {

  const [chatHistory, setChatHistory] = useState<string[]>([])

  useEffect(() => {
    connect((msg) => setChatHistory((prev) => [...prev, msg]))
  }, [])

  function handleSend() {
    console.log('send');
    send("hello")
  }

  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={chatHistory} />
      <button onClick={handleSend}>Hit</button>
    </div>
  );
}

export default App;
