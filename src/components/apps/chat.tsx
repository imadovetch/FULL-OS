import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import  { Messages }  from  '@/../../APPS/ChatApp'
export function Chat({ data }: { data: APP_DATA_TYPE }) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const socket = io('http://localhost:3001'); 

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [socket]);
    const sendMessage = () => {
        socket.emit('message', currentMessage);
        setCurrentMessage('');
    };
    return (
        <Window data={data}>
           {/* <div>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
            <input
                type="text"
                className='text-black'
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
            />

            <button onClick={sendMessage}>Send</button>
        </div> */}
        <Messages/>
        </Window>
    )

}
{/* <div class="flex flex-col flex-auto h-full p-6">
        <div
          class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>Hey How are you today?</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vel ipsa commodi illum saepe numquam maxime
                        asperiores voluptate sit, minima perspiciatis.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>Lorem ipsum dolor sit amet !</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                      </div>
                      <div
                        class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                      >
                        Seen
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis, in.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div class="flex flex-row items-center">
                        <button
                          class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"
                        >
                          <svg
                            class="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                        <div class="flex flex-row items-center space-x-px ml-4">
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-12 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-6 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-5 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-3 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          >
            <div>
              <button
                class="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="w-5 h-5"
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
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input
                  type="text"
                  class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-6 h-6"
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
            <div class="ml-4">
              <button
                class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
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
      </div> */}

    //   audio
    //   "use client"
    //   import React, { useState } from 'react';
      
    //   const AudioRecorder = () => {
    //       const [mediaRecorder, setMediaRecorder] = useState(null);
    //       const [recordedChunks, setRecordedChunks] = useState([]);
    //       const [audioUrl, setAudioUrl] = useState(null);
      
    //       const startRecording = () => {
    //           navigator.mediaDevices.getUserMedia({ audio: true })
    //               .then(stream => {
    //                   const recorder = new MediaRecorder(stream);
    //                   recorder.ondataavailable = handleDataAvailable;
    //                   recorder.start();
    //                   setMediaRecorder(recorder);
    //               });
    //       };
      
    //       const handleDataAvailable = (event) => {
    //           if (event.data.size > 0) {
    //               setRecordedChunks([...recordedChunks, event.data]);
    //           }
    //       };
      
    //       const stopRecording = () => {
    //           mediaRecorder.stop();
    //       };
      
    //       const playAudio = () => {
    //           const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    //           const audioURL = URL.createObjectURL(blob);
    //           setAudioUrl(audioURL);
    //       };
      
    //       const sendAudio = () => {
    //           const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      
    //           const formData = new FormData();
    //           formData.append('audio', blob, 'audio.webm');
      
    //           fetch('/upload-audio', {
    //               method: 'POST',
    //               body: formData
    //           })
    //           .then(response => {
    //               // Handle response from server
    //           })
    //           .catch(error => {
    //               console.error('Error sending audio:', error);
    //           });
    //       };
      
    //       return (
    //           <div>
    //               <button onClick={startRecording}>Start Recording</button>
    //               <button onClick={stopRecording}>Stop Recording</button>
    //               <button onClick={playAudio} disabled={!recordedChunks.length}>Play Audio</button>
    //               <button onClick={sendAudio} disabled={!recordedChunks.length}>Send Audio</button>
    //               {audioUrl && <audio controls src={audioUrl} />}
    //           </div>
    //       );
    //   };
      
    //   export default AudioRecorder;
      
