import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { message: input, sender: 'user' }]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/ask', {
        message: input
      });

      setMessages([...messages, { message: response.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.sender === 'user' ? 'You: ' : 'Bot: '}{msg.message}</p>
          </div>
        ))}
      </div>
      <div>
        <input value={input} onChange={handleInputChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
