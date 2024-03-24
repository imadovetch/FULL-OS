import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Messages({owner , totext }) {
 
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      // Connect socket when component mounts
      const newSocket = io('http://localhost:3001');
      setSocket(newSocket);

      // Disconnect socket when component unmounts
      return () => {
          if (newSocket) {
              newSocket.disconnect();
          }
      };
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
      if (!socket) return;

      // Listen for incoming messages and update state
      socket.on('message', (message) => {
        console.log(message)
          if ((message.receiver === totext && message.sender === owner) ||
              (message.receiver === owner && message.sender === totext)) {
              setMessages(prevMessages => [...prevMessages, message]);
          }
      });
      setMessages([]);
      const fetchmessages = async ()=>{
        try {
          const response = await fetch('/api/Getmessages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ user1: owner, user2: totext }) 
          });
  
          if (!response.ok) {
              throw new Error('Failed to fetch messages');
          }
  
          const responseData = await response.json();
            console.log('Messages fetched successfully:', responseData.messages);

            const messagesToAdd = responseData.messages.map(message => {
                if (Number(message.senderId) == owner) {
                    return { sender: Number(message.senderId), receiver: totext, msg: message.content };
                } else {
                    return { sender: Number(message.senderId), receiver: owner, msg: message.content };
                }
            });
            console.log(messagesToAdd)
            setMessages(messagesToAdd);
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
      }
      fetchmessages();
      // Cleanup socket listener when component unmounts
      return () => {
          socket.off('message');
      };
      
  }, [socket, owner, totext]);

  const sendMessage = async  () => {
    if (!socket) return;
    const messagepack = { sender: owner, receiver: totext, msg: currentMessage };
    socket.emit('message', messagepack);
    setCurrentMessage('');
    const messageData = {
      user1: owner, 
      user2: totext, 
      senderId: owner, 
      content: currentMessage 
  };

  try {
      const response = await fetch('/api/conversations', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageData)
      });

      if (!response.ok) {
          throw new Error('Failed to send message');
      }

      const responseData = await response.json();
      console.log('Message sent successfully:', responseData);
  } catch (error) {
      console.error('Error sending message:', error);
  }
};

    return (
         <div className="flex flex-col  h-full flex-auto">
        <div
          className="flex flex-col flex-auto flex-shrink-0  bg-gray-100 h-full p-4"
        >
           
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
            return (
                <div className="grid grid-cols-12 gap-y-2">
                 
                  {messages.map((element, index) => {
                    if (element.sender === owner) {
                      return (
                        <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              A
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div className="text-black">{element.msg}</div>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (element.sender === totext) {
                      return (
                        <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              A
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div className="text-black">{element.msg}</div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null; // Handle other cases if necessary
                    }
                  })}
                </div>
              );

            </div>
          </div>
          <div
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          >
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="text-black flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
              onClick={sendMessage}
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div> 
    );
}