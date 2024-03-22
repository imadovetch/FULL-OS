import { useState } from "react";

export default function Conversation({whichConversation}) {
    const [activeConversation, setActiveConversation] = useState(null);

    const [conversations, setConversations] = useState([
        {
            id: 1,
            avatar: 'https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg',
            title: 'New Movie! Expendables',
            status: 'https://img.icons8.com/material-rounded/24/00FF32/100-percents.png',
            unreadMessages: 3,
            time: '12:45 pm'
        },
        {
            id: 2,
            avatar: 'https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg',
            title: 'Project Discussion',
            status: 'https://img.icons8.com/material-rounded/24/00FF32/100-percents.png',
            unreadMessages: 1,
            time: '1:30 pm'
        },
        {
            id: 3,
            avatar: 'https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg',
            title: 'Team Meeting',
            status: 'https://img.icons8.com/material-rounded/24/00FF32/100-percents.png',
            unreadMessages: 2,
            time: '2:15 pm'
        },
        {
            id: 4,
            avatar: 'https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg',
            title: 'Weekly Update',
            status: 'https://img.icons8.com/material-rounded/24/00FF32/100-percents.png',
            unreadMessages: 0,
            time: '3:00 pm'
        },
        // Add more conversation objects as needed
    ]);

    const handleConversationClick = (id) => {
        console.log(`Clicked conversation ID: ${id}`);
        setActiveConversation(id);
        whichConversation(id);
    };

    
        
        

    


    return(
        <div className="h-full bg-white w-96 border border-black flex   ">
            <div className="flex flex-col w-full gap-4 h-full">
                <div className="w-full border justify-center gap-4 py-2 px-3 bg-gray-200 flex items-center">
                    <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="User Avatar"/>
                    <div className="ml-4 flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="text-gray-700">
                            <path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="ml-4 text-gray-700">
                            <path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="ml-4 text-gray-700">
                            <path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
                        </svg>
                    </div>
                </div>
                <div className="flex flex-row gap-1 bg-white/80 border rounded-md py-1 px-4 w-4/5 mx-auto">
                    <svg viewBox="0 0 344 384" height="26.72093023255814" width="17" className="text-gray-700">
                        <path fill="#000000" d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z"/>
                    </svg>
                    <input id="" name="" placeholder="Search contact" type="text" className="text-black px-2 rounded-md focus:outline-none flex-1"/>
                </div>

                <div className=" bg-gray-100 border h-full p-4 rounded-md gap-2 w-full overflow-auto flex-1">
            {conversations.map(conversation => (
                <div 
                    key={conversation.id} 
                    className={`px-3 hover:cursor-pointer border-t pt-2 mt-2 flex w-full items-center cursor-pointer rounded-md ${activeConversation === conversation.id ? 'bg-black' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => handleConversationClick(conversation.id)}
                >
                    <div className="relative flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={conversation.avatar} alt="Contact Avatar"/>
                        <span className="absolute bottom-0 left-0 inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="ml-4 w-full border-b border-gray-300">
                        <div className="flex items-center justify-between  w-full">
                            <p className="text-black font-thin text-xl truncate">{conversation.title}</p>
                            <div className="ml-4 text-xs text-black">
                                <img width="15" height="15" src={conversation.status} alt="Status Icon"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-gray-500 font-mono font-bold flex gap-2 items-center text-sm">
                                Get Andrés on ...
                                <div className="">
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <img width="25" height="25" src="https://img.icons8.com/sf-black/25/A20000/filled-circle.png" alt="filled-circle"/>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px', color: '#fff' }}>{conversation.unreadMessages}</div>
                                    </div>
                                </div>
                            </p>
                            <p className="text-xs text-black">{conversation.time}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
                


            </div>
    </div>
    )
}