import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    socket.on('message', (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
