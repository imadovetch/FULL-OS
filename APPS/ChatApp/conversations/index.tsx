import { useState , useEffect} from "react";

export default function Conversation({whichConversation}) {
    const [activeConversation, setActiveConversation] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [filteredConversations, setFilteredConversations] = useState([]);
    const [newfriend, setnewfriends] = useState(false);
    const [nonfriends, setnonfriends] = useState([]);
    const [showrequests, setshowrequests] = useState(false);
    const [requests, setRequests] = useState([
        { id: 1, sender: 'John Doe', message: 'Friend request from John Doe' },
        { id: 2, sender: 'Jane Smith', message: 'Friend request from Jane Smith' },
        { id: 3, sender: 'Alice Johnson', message: 'Friend request from Alice Johnson' }
    ]);

    const handleAccept = (id) => {
        console.log(`Accepted request with ID: ${id}`);
        setRequests(requests.filter(request => request.id !== id));
    };

    const handleDecline = (id) => {
        console.log(`Declined request with ID: ${id}`);
        setRequests(requests.filter(request => request.id !== id));
    };
    
    useEffect(() => {
        if (filteredConversations.length === 0 && searchText) {
            console.log('Empty');
            setnewfriends(true);
            setnonfriends([
                { id: 1, name: 'imad', email: 'imad@example.com' },
                { id: 2, name: 'ilyas', email: 'ilyas@example.com' },
                { id: 3, name: 'adam', email: 'adam@example.com' }
            ]);
        } else {
            console.log('Not empty');
            setnewfriends(false);
            setnonfriends([]); 
        }
    }, [filteredConversations]);
    
    const handleAddFriend = (friendId) => {
        console.log(`Added friend with ID: ${friendId}`);
       
    };

    const conversations = [
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
    ];

    const handleConversationClick = (id) => {
        console.log(`Clicked conversation ID: ${id}`);
        setActiveConversation(id);
        whichConversation(id)
    };

    // Filter conversations based on search text
    const filterConversations = (text) => {
        setSearchText(text);
        if (!text) {
            setFilteredConversations([]);
            return;
        }
        const filtered = conversations.filter(conversation =>
            conversation.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredConversations(filtered);
    };

    // Choose conversations based on whether search text is entered or not
    const chosenConversations = searchText ? filteredConversations : conversations;

    
        
     function showfriendrequests(){
        setshowrequests(!showrequests);
    }

    


    return (
        <div className="h-full bg-white min-w-96 border border-black flex">
            <div className="flex flex-col w-full gap-4 h-full">
                <div className="w-full border justify-between  gap-4  p-4 bg-gray-200 flex items-center">
                    <div className=" w-3/5 flex justify-start gap-4 items-center">
                    <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="User Avatar"/>
                        <span className="text-black flex gap-4 items-center ">User 
                        <img width="15" height="15" src="https://img.icons8.com/material-rounded/24/00FF32/100-percents.png"  alt="Status Icon"/>

                        </span>

                    </div>
                    <div className="ml-4 flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="text-gray-700">
                            <path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"/>
                        </svg>
                        
                        <svg className=" hover:cursor-pointer" onClick={()=>{showfriendrequests()}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="ml-4 text-gray-700">
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
                    <input 
                        id="search" 
                        name="search" 
                        placeholder="Search contact" 
                        type="text" 
                        className="text-black px-2 rounded-md focus:outline-none flex-1 ml-2"
                        value={searchText}
                        onChange={(e) => filterConversations(e.target.value)}
                    />                
                </div>
    
                <div className="bg-gray-100 border h-full p-4 rounded-md gap-2 w-full overflow-auto flex-1" style={{ minWidth: "450px" }}>
                    {
                        showrequests ?(
                           
                            requests.map(request => (
                                <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mb-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img className="rounded-full mr-2" width="40" height="40" src={`https://i.pravatar.cc/150?u=${request.sender}`} alt={request.sender} />
                                        <div>
                                            <p className="text-lg font-semibold text-black">{request.sender}</p>
                                            <p className="text-sm text-black">{request.message}</p>
                                        </div>
                                    </div>
                                    <div className="  flex gap-4">
                                        <img  className=" hover:cursor-pointer"  onClick={() => handleAccept(request.id)} width="35" height="35" src="https://img.icons8.com/color/35/checked-checkbox.png" alt="checked-checkbox"/>                                     
                                        <img  className=" hover:cursor-pointer  " onClick={() => handleDecline(request.id)} width="35" height="35" src="https://img.icons8.com/color/35/cancel--v1.png" alt="cancel--v1"/>
                                    </div>
                                </div>
                            ))
                         
                        ) : newfriend ? (
                       <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                       <div className="flex items-center justify-between px-4 py-3">
                           <h5 className="text-2xl font-bold leading-none text-black dark:text-white  m-auto p-2">Add New friends</h5>
                       </div>
                       <div className="divide-y divide-gray-200 dark:divide-gray-700">
                           {nonfriends.map(friend => (
                               <div key={friend.id} className="p-4">
                                   <div className="flex items-center justify-between">
                                       <div className="flex items-center">
                                           <div className="flex-shrink-0">
                                               <img className="w-12 h-12 rounded-full" src="data:image/jpeg;base64,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" alt="Friend" />
                                           </div>
                                           <div className="ml-3">
                                               <p className="text-sm font-medium text-black dark:text-white">{friend.name}</p>
                                               <p className="text-sm text-gray-500 dark:text-gray-400">{friend.email}</p>
                                           </div>
                                       </div>
                                       <div onClick={() => handleAddFriend(friend.id)} className="  rounded-sm hover:cursor-pointer hover:shadow  hover:scale-110  text-base font-semibold text-black dark:text-white">
                                           <img width="35" height="35" src="https://img.icons8.com/color/35/add-user-group-woman-woman.png" alt="Add Friend" />
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
                   
                    
                    ) : (
                            // Render normal conversations
                            chosenConversations.map(conversation => (
                                <div 
                                    key={conversation.id} 
                                    className={`px-3 hover:cursor-pointer border-t pt-2 mt-2 flex w-full items-center cursor-pointer rounded-md ${activeConversation === conversation.id ? 'convchoosed p-4 bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    onClick={() => handleConversationClick(conversation.id)}
                                >
                                    <div className="relative flex-shrink-0">
                                        <img className="h-12 w-12 rounded-full" src={conversation.avatar} alt="Contact Avatar"/>
                                        <span className="absolute bottom-0 left-0 inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                    </div>
                                    <div className="ml-4 w-full border-b border-gray-300">
                                        <div className="flex items-center justify-between w-full">
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
                            ))
                        )}
                    </div>

                


            </div>
    </div>
    )
}

