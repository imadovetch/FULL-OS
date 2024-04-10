import { useState } from "react";
import { Window } from './window';

export default function Gallery({data} ) {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Photo 1"
    },
    
    {
      src: "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1493&amp;q=80",
      alt: "Photo 9"
    }
  ];
  

  
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

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

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
              <div className="absolute bottom-4     right-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleDelete}>Delete</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleClose}>About</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
}