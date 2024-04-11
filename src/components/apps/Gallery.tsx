import { useState , useEffect} from "react";
import { Window } from './window';
import { gettoken  } from "../../../utils/modules"
import { BACKEND_LINK } from "@/data/const"
import { APP_CONTAINER } from "@/data/store/AppContainer"
import { useDispatch, useSelector } from "react-redux"
export default function Gallery({data} ) {
    const token = gettoken('token');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photos, setphotos] = useState([
    {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Photo 1"
    },
    
    {
      src: "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1493&amp;q=80",
      alt: "Photo 9"
    }
  ]);
  const dispatch = useDispatch()

    
    
    
  
  useEffect(()=>{

    fetch(BACKEND_LINK+'api/FetchForGallery', {
              method: 'POST',
              headers: {
                    'Authorization': token 
                },
            })
            .then(response => response.json())
            .then(data => {
                if(!data.photos[0]) return;
              console.log('Photo s', data);
              setphotos(data.photos.map(photo => ({
                src: BACKEND_LINK+'api/images/' + photo.text,
                alt: photo.text,
            })));
            })
            .catch(error => {
              console.error('Error uploading photo:', error);
            });

  },[])

  

  
  const filteredPhotos = photos.filter(photo =>
    photo.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleDelete = () => {
    console.log("Delete photo with index:", selectedPhotoIndex);
    setSelectedPhotoIndex(null); 
  };

  const handleClose = (picked:string) => {
    dispatch(APP_CONTAINER.UPDATEBG({BGchoosed: picked}))
    setSelectedPhotoIndex(null);
  };
function closeit(){
    setSelectedPhotoIndex(null);
}
  return (
    <Window data={data}>
      <div className={`w-full h-[90%] ${((data.width > 1000) || (data.fullscreen) ? 'p-8' : 'p-1') } flex flex-col`}>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search"
          className="p-2 border border-gray-300 rounded-md w-4/5 my-2 mx-auto mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Gallery photos */}
        <div className={`grid p-3 grid-cols-1 gap-4 ${((data.width > 1000) || (data.fullscreen) ? 'grid-cols-4' : 'md:grid-cols-3') } overflow-y-auto custom-scrollbar`}>
          {filteredPhotos.map((photo, index) => (
            <div key={index} onClick={() => handleClick(index)}>
              <img
                className="object-cover hover:cursor-pointer hover:scale-105 photosshadowgalery object-center w-full h-40 max-w-full rounded-lg"
                src={photo.src}
                alt={photo.alt}
              />
            </div>
          ))}
        </div>

        {/* Enlarged photo view */}
        {selectedPhotoIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative w-4/5 h-4/5">
              <img
                className="object-contain w-full h-full rounded-lg"
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].alt}
              />
              <div className="absolute top-10 flex  gap-3 border-app-light lightshadow rounded-md p-1 shadow  right-4">
               
                <img className="  hover:scale-105 hover:cursor-pointer " onClick={handleDelete} width="40" height="40" src="https://img.icons8.com/plasticine/40/filled-trash.png" alt="filled-trash"/>
                
                <button className="bg-app-primary  text-white px-4 py-2 rounded-md" onClick={()=>{handleClose(filteredPhotos[selectedPhotoIndex].src)}}>Set BG</button>
                <img className="  hover:scale-105 hover:cursor-pointer " width="30" height="30" onClick={closeit} src="https://img.icons8.com/ios-filled/30/000000/u-turn-to-left.png" alt="u-turn-to-left"/>
              </div>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
}