export default function ChatGalery({data,status}){
  
    return(
     <div className={` grid ${(data.width > 800 && data.width<1000) ? ' grid-cols-1' : 'grid-cols-2'}  gap-2 absolute bottom-0 p-1  right-0 ${(data.fullscreen || (data.width > 1000)) ? 'w-2/5' : ((data.width > 800 ) ? 'w-1/5' : 'w-3/5')}  h-4/5 border bg-black z-50 ${status ? '' : 'hidden'}`}>
            <div className="w-full h-full bg-red-700 "></div>
            <div className="w-full h-full bg-red-700 "></div>
            <div className="w-full h-full bg-red-700 "></div>
            <div className="w-full h-full bg-red-700 "></div>
     </div>
    )
}