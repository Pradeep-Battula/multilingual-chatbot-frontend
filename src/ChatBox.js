import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ChatBox = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { type: "user", text: userInput };
    setMessages([...messages, newMessage]);
    setUserInput("");

    try {
      const res = await axios.post(API_URL, { user_input: userInput });
      const botReply = res.data.reply;
      setMessages((prev) => [...prev, { type: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { type: "bot", text: "Error getting response." }]);
    }
  };

  return (
    <div className="card p-3">
      <div style={{ height: "400px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.type === "user" ? "text-end" : "text-start"}`}>
            <span className={`badge bg-${msg.type === "user" ? "primary" : "success"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          value={userInput}
          className="form-control"
          placeholder="Type your message..."
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;