import { useState , useEffect} from "react";

import { BACKEND_LINK } from "@/data/const"
import { gettoken  } from "../../../utils/modules"
export default function Conversation({data,whichConversation}) {
    const token = gettoken('token');
    const {Name} = JSON.parse(gettoken('userinfos'));
    console.log( Name)
    if (!token) console.log('jri 3liiih'); 
    
    const [activeConversation, setActiveConversation] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [filteredConversations, setFilteredConversations] = useState([]);
    const [newfriend, setnewfriends] = useState(false);
    const [conversations, setconversations] = useState([]);
    const [nonfriends, setnonfriends] = useState([]);
    const [showrequests, setshowrequests] = useState(false);
    const [requests, setRequests] = useState([]);
    const [notifclicked, setchatnotif] = useState(false);
    const [storiesmode, setstoriesmode] = useState(false);
  
    const urlback = BACKEND_LINK;
    const togglenotif = () => {
        setchatnotif(!notifclicked)
        fetch(urlback+'api/updateusersettings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({
                type:'chat',
                chatnotif : notifclicked,
            })
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('Error fetching non-friends:', error);

        });
    };
    const handleAccept = (id) => {
        console.log(`Accepted request with ID: ${id}`);
        setRequests(requests.filter(request => request.id !== id));
        respondeonreq(id,1)
    };

    const handleDecline = (id) => {
        console.log(`Declined request with ID: ${id}`);
        setRequests(requests.filter(request => request.id !== id));
        respondeonreq(id,0)
    };
    function respondeonreq(id:Number, status:number){
        fetch(urlback+'api/respondeonreq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify({
                    status : status,
                    id : id
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching non-friends:', error);

            });
    }
    useEffect(() => {
        if (filteredConversations.length === 0 && searchText) {
            console.log('Empty');
            setnewfriends(true);
           

            fetch(urlback+'api/nonfriends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify({

                })
            })
            .then(response => response.json())
            .then(data => {
                setnonfriends(data.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                })));
            })
            .catch(error => {
                console.error('Error fetching non-friends:', error);

            });

        } else {
            console.log('Not empty');
            setnewfriends(false);
            setnonfriends([]); 
        }
    }, [filteredConversations]);
    useEffect(() => {
        fetch(urlback+'api/getconversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({

            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setconversations(data.map(user => ({
                id: user.UniqueId,
                avatar:user.avatar,
                title: user.email,
                name: user.name,
                status: 'https://img.icons8.com/material-rounded/24/00FF32/100-percents.png',
                unreadMessages: 3,
                time: '12:45 pm'
            })));
        })
        .catch(error => {
            console.error('Error fetching non-friends:', error);

        });
    },[])
    const handleAddFriend = (friendId) => {
       
    
        const data = {
            friendId: friendId
        };
    
        fetch(urlback+'api/sendrequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(data) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Friend added successfully:', data);
        })
        .catch(error => {
            // Handle error
            console.error('Error adding friend:', error);
        });
    };
    

    const chosenConversations = searchText ? filteredConversations : conversations;
    const handleConversationClick = (id:string,index:number) => {
        console.log(`Clicked conversation ID: ${index}`);
        setActiveConversation(id);
        console.log(chosenConversations[index])
        localStorage.setItem('fastiuslesgettername',chosenConversations[index].name)
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

    

    
        
     function showfriendrequests(){
        setshowrequests(!showrequests);
        
        fetch(urlback+'api/PendingRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify({

                })
            })
            .then(response => response.json())
            .then(data => {
                setRequests(data.map(user => ({
                    id: user.id,
                    sender: user.name,
                    message: user.email
                })));
            })
            .catch(error => {
                console.error('Error fetching non-friends:', error);

            });

    }
    
    return (
        <div className={`h-full ${data.width < 700 && !activeConversation ? 'w-full':''} ${!data.fullscreen ? ((data.width < 800) && activeConversation ? 'hidden' :''): ''} bg-app-light min-w-96 border-r border-gray-200      border-app-dark flex`}>
            <div className="flex flex-col w-full gap-4 h-full">
                <div className="w-full border justify-between  gap-4  p-4 bg-gray-200 flex items-center">
                    <div className=" w-3/5 flex justify-start gap-4 items-center">
                    <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="User Avatar"/>
                        <span className="text-app-dark flex gap-4 items-center ">{Name} 
                        <img width="15" height="15" src="https://img.icons8.com/material-rounded/24/00FF32/100-percents.png"  alt="Status Icon"/>

                        </span>
                        
                    </div>
                    <div className="ml-4 flex items-center gap-4 ">
                    <img onClick={()=>{setstoriesmode(!storiesmode)}} className="rounded  hover:scale-105 hover:cursor-pointer " width="27" height="27" src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/27/external-Stories-social-media-bearicons-detailed-outline-bearicons.png" alt="external-Stories-social-media-bearicons-detailed-outline-bearicons"/>
                        
                        
                        <img className=" rounded hover:scale-105  hover:cursor-pointer" onClick={()=>{showfriendrequests()}}  width="27" height="27" src="https://img.icons8.com/deco/27/add-user-group-man-man.png" alt="add-user-group-man-man"/>
                        <img className=" rounded hover:scale-105  hover:cursor-pointer"  onClick={()=>{togglenotif()}} width="27" height="27" src={`https://img.icons8.com/ios-filled/27/${notifclicked ? '000000':'0040FF'}/appointment-reminders--v1.png`} alt="appointment-reminders--v1"/>


                    </div>
                </div>
                <div className="flex flex-row gap-1 bg-app-shadow h-10 border rounded-md py-1 px-4 w-4/5 mx-auto">
                    <svg viewBox="0 0 344 384" height="26.72093023255814" width="17" className="text-gray-700">
                        <path fill="#000000" d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z"/>
                    </svg>
                    <input 
                        id="search" 
                        name="search" 
                        placeholder="Search contact" 
                        type="text" 
                        className="text-app-dark px-2 rounded-md focus:outline-none flex-1 ml-2"
                        value={searchText}
                        onChange={(e) => filterConversations(e.target.value)}
                    />                
                </div>
                <div className={`${storiesmode ? '': 'hidden'}  ${(data.fullscreen || (data.width >700) ? 'w-5/5 mx-auto ': 'grid-cols-2 w-full')} border  grid ${(data.fullscreen || (data.width >900) ? 'grid-cols-3 ': 'grid-cols-2 ')} max-h-full gap-4 p-5 custom-scrollbar border-app--light `}>
         

                <div className="storiecardowner relative">
  <div className="card-info">
    <p className="title">Magic Card</p>
    <img width="37" className=" bottom-5 right-2  absolute" height="37" src="https://img.icons8.com/color/37/plus--v1.png" alt="plus--v1"/>
  </div>
</div>
<div className="storiecard">
  <div className="card-info">
    <p className="title">Magic Card</p>
  </div>
</div>
<div className="storiecard">
  <div className="card-info">
    <p className="title">Magic Card</p>
  </div>
</div>


   

                </div>
                <div className={`bg-gray-100 border h-full ${storiesmode ? 'hidden': ''}  rounded-md gap-2 w-full p-1  overflow-auto flex-1`} style={{ minWidth: "450px" }}>
                    {
                        showrequests ?(
                            <div className="w-full bg-app-light border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between px-4 py-3">
                                <h5 className="text-2xl font-bold leading-none text-app-dark dark:text-app-light  m-auto p-2">Pending Requests</h5>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                           { requests.map(request => (
                                <div key={request.id} className="bg-app-light border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mb-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img className="rounded-full mr-2" width="40" height="40" src={`https://i.pravatar.cc/150?u=${request.sender}`} alt={request.sender} />
                                        <div>
                                            <div className="text-lg font-semibold text-app-dark">{request.sender}</div>
                                            <div className="text-sm text-app-dark">{request.message}</div>
                                        </div>
                                    </div>
                                    <div className="  flex gap-4">
                                        <img  className=" hover:cursor-pointer"  onClick={() => handleAccept(request.id)} width="35" height="35" src="https://img.icons8.com/color/35/checked-checkbox.png" alt="checked-checkbox"/>                                     
                                        <img  className=" hover:cursor-pointer  " onClick={() => handleDecline(request.id)} width="35" height="35" src="https://img.icons8.com/color/35/cancel--v1.png" alt="cancel--v1"/>
                                    </div>
                                </div>
                            ))}
                            </div>
                   </div>
                        ) : newfriend ? (
                       <div className="w-full bg-app-light border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                       <div className="flex items-center justify-between px-4 py-3">
                           <h5 className="text-2xl font-bold leading-none text-app-dark dark:text-app-light  m-auto p-2">Add New friends</h5>
                       </div>
                       <div className="divide-y divide-gray-200 dark:divide-gray-700">
                           {nonfriends.map(friend => (
                               <div key={friend.id} className="p-4">
                                   <div className="flex items-center justify-between">
                                       <div className="flex items-center">
                                           <div className="flex-shrink-0">
                                               <img className="w-12 h-12 rounded-full" src={`${friend.avatar}`} alt="Friend" />
                                           </div>
                                           <div className="ml-3">
                                               <div className="text-sm font-medium text-app-dark dark:text-app-light">{friend.name}</div>
                                               <div className="text-sm text-gray-500 dark:text-gray-400">{friend.email}</div>
                                           </div>
                                       </div>
                                       <div onClick={() => handleAddFriend(friend.id)} className="  rounded-sm hover:cursor-pointer hover:shadow  hover:scale-110  text-base font-semibold text-app-dark dark:text-app-light">
                                           <img width="35" height="35" src="https://img.icons8.com/color/35/add-user-group-woman-woman.png" alt="Add Friend" />
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
                   
                    
                    ) : (
                       
                            chosenConversations.map((conversation,index) => (
                                <div 
                                    key={conversation.id} 
                                    className={`px-3 hover:cursor-pointer border-t pt-2 mt-2 flex w-full items-center cursor-pointer rounded-md ${activeConversation === conversation.id ? 'convchoosed p-2 ' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    onClick={() => handleConversationClick(conversation.id,index)}
                                >
                                    <div className="relative flex-shrink-0">
                                        <img className="h-12 w-12 rounded-full" src={conversation.avatar} alt="Contact Avatar"/>
                                        <span className="absolute bottom-0 left-0 inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                    </div>
                                    <div className="ml-4 w-full border-b border-gray-300">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-app-dark   text-xl truncate">{conversation.title}</div>
                                            <div className="ml-4 text-xs text-app-dark">
                                                <img width="15" height="15" src={conversation.status} alt="Status Icon"/>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-app--dark  font-mono font-bold flex gap-2 items-center text-sm">
                                                Get Andrés on ...
                                               
                                            </div>
                                            <div className="text-xs text-app-dark">{conversation.time}</div>
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

