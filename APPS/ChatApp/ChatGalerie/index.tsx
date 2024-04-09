import React, { useState } from 'react';

export default function ChatGalery({data,status , getphoto}){
  

  const dummyPhotos = [
    { id: 1, src: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, src: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 3, src: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 4, src: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 5, src: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 6, src: 'https://randomuser.me/api/portraits/men/1.jpg' },
  ];

  const [photos, setPhotos] = useState(dummyPhotos);

  const handlePhotoClick = (photoId) => {
    console.log('Clicked photo ID:', photoId);
    getphoto(photoId)
  };
    return(
     <div className={` grid ${(data.width > 800 && data.width<1000) ? ' grid-cols-1' : 'grid-cols-2'}  custom-scrollbar  gap-2 absolute bottom-0 p-1  right-0 ${(data.fullscreen || (data.width > 1000)) ? 'w-2/5' : ((data.width > 800 ) ? 'w-1/5' : 'w-3/5')}  h-4/5 Chatphotoholder z-50 ${status ? '' : 'hidden'}`}>
           {photos.map((photo) => (
        <div key={photo.id} className="cardPhotoChat" onClick={() => handlePhotoClick(photo.src)}>
          <img className='w-full h-full' src={photo.src} alt={`Photo ${photo.id}`} />
        </div>
      ))}
           
     </div>
    )
}