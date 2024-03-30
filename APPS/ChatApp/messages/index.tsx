import { useState,useRef, useEffect } from 'react';
import io from 'socket.io-client';

import { ChatGalery } from "../index"

export default function Messages({owner ,data, totext }) {
 
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [ChatGalerie, setChatgalery] = useState(false);
  const [msgtype, setmessagetype] = useState('text');
  const [photo, setphoto] = useState('');
  const messagesRef = useRef(null);

  function showChatGalery(){
    setChatgalery(!ChatGalerie);
  }
  function getPhotoparent(photopath:string){
    console.log('photois here' + photopath)
    setphoto(photopath)
    setmessagetype('image')
    setCurrentMessage(photopath);
    setChatgalery(false);
  }

  useEffect(() => {
      const newSocket = io('https://full-os.vercel.app');
      setSocket(newSocket);

      return () => {
          if (newSocket) {
              newSocket.disconnect();
          }
      };
  }, []); 

  useEffect(() => {
      if (!socket) return;

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
            console.log('Mfetched successfully:', responseData.messages);
            console.log('njibojl' ,owner , 'j' ,totext ,'j' )

            const messagesToAdd = responseData.messages.map(message => {
              console.log(owner + 'j' +totext + 'j' + message.senderId)
                if (message.senderId == owner) {
                    return { sender: message.senderId, receiver: totext, type:message.type, msg: message.content };
                } else {
                    return { sender: message.senderId, receiver: owner, type:message.type ,msg: message.content };
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
    var contenttosend = '';
    if(photo == ''){
      contenttosend = currentMessage
      
    }else if( photo !== ''){
      contenttosend = photo
      setphoto('')
    }
    if (!socket) return;
    const messagepack = { sender: owner, receiver: totext, type:msgtype, msg: contenttosend };
    socket.emit('message', messagepack);
    setCurrentMessage('');
    
   
    const messageData = {
      user1: owner, 
      user2: totext, 
      senderId: owner, 
      content: contenttosend ,
      type:msgtype
  };
  setmessagetype('text');
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

  if (messagesRef.current) {
    console.log("hihhhh")
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }
};

function CancelSendingphotot(){
      setphoto('');
      setCurrentMessage('')
}
    return (
         <div className={`flex flex-col ${data.fullscreen ?'h-[95%]' : 'h-full'}  flex-auto`}>
        <div
          className="flex flex-col flex-auto flex-shrink-0  bg-gray-100 h-full  px-3"
        >
           
          <div ref={messagesRef} className="border relative flex  items-center flex-col h-full overflow-y-auto   ">
          <div className={` fixed m-auto  h-12 bg-app-shadow z-10 ${((data.width > 800)) ?'w-1/5' : 'w-2/5'}  flex justify-start items-center shadow bg-app-light rounded-lg px-4`}>
            <img src='https://randomuser.me/api/portraits/men/1.jpg' alt='https://randomuser.me/api/portraits/men/1.jpg' className='h-4/5 w-10 rounded-lg  mr-4' />
            <span className='text-sm ml-1  text-app-dark font-mono'>Alice Moon</span>
        </div>
            <div   className="flex flex-col    w-full">
            
                
                 
                {messages.map((element, index) => {
              if (element.sender === owner) {
                if (element.type == 'text') {
                  return (
                    <div key={index} className={`col-start-1 ${index === 0 ?'mt-10' : ''} col-end-8 p-3 rounded-lg`}>
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                        <div className="relative ml-3 text-sm bg-app-light py-2 px-4 shadow rounded-xl">
                          <div className="text-black">{element.msg}</div>
                        </div>
                      </div>
                    </div>
                  );
                } else if (element.type === 'image') {
                  return (
                    <div key={index} className={`col-start-1 ${index === 0 ?'mt-10' : ''} col-end-8 p-3 rounded-lg`}>
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                        <div className="relative ml-3 text-sm bg-app-light py-2 px-4 shadow rounded-xl">
                          <img src={element.msg} alt="Message Image" />
                        </div>
                      </div>
                    </div>
                  );
                } else if (element.type === 'audio') {

                  return null;
                }
              } else if (element.sender === totext) {
                if (element.type == 'text') {
                return (
                  <div key={index} className={`col-start-6 ${index === 0 ?'mt-10' : ''} col-end-13 p-3 rounded-lg`}>
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div className="text-black">{element.msg}</div>
                      </div>
                    </div>
                  </div>
                );
                }else if (element.type === 'image') {
                  return (
                    <div key={index} className={`col-start-6 ${index === 0 ?'mt-10' : ''} col-end-13 p-3 rounded-lg`}>
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <img src={element.msg} alt="Message Image" />
                        </div>
                      </div>
                    </div>
                  );
                } else if (element.type === 'audio') {

                  return null;
                }
              } else {
                return null; 
              }
            })}
                
              

            </div>
          </div>
          <div
            className="flex flex-row items-center h-16 rounded-xl bg-app-light w-full px-4"
          >
            <div>
              <button onClick={()=>{showChatGalery()}}
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
              <ChatGalery data={data} getphoto={getPhotoparent} status={ChatGalerie}/>
            </div>
            <div className="flex-grow ml-4">
              
              <div className="relative w-full">

                  <div className='relative'>
                    {
                      photo !== '' && 

                  <div onClick={()=>{CancelSendingphotot()}} className=' absolute  bg-app-light shadow rounded-lg p-1  bottom-11 right-0  w-3/5 h-40 border'>
                    <img className='h-full w-full' src={photo} alt="" /> 
                  
                  </div>
                    }

                  <input
                    type="text"
                    value={photo === '' ? currentMessage : ''}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="text-black flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />

                  </div>
                
                
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
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-app-light px-4 py-1 flex-shrink-0"
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