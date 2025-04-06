import React from 'react';
import ChatBox from './ChatBox';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🌐 Multilingual Chatbot</h2>
      <ChatBox />
    </div>
  );
}

export default App;