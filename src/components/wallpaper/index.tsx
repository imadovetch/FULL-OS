import Image from "next/image"
import { WALLPAPER_LINK } from "@/data/const"

import { useDispatch, useSelector } from "react-redux"
import { STORE_DATA_TYPE } from "@/data/store"
import { SETTINGS_ACTIONS } from "@/data/store/settings"

export function Wallpaper(){
    const containerapp = useSelector((store:STORE_DATA_TYPE) => store.AppContainer)
    const dispatch = useDispatch()
    return (
        <Image
        className="fixed -z-10 w-full h-full object-cover"
        src={containerapp.BG}
        alt="wallpaper"
        layout="fill" 
        objectFit="cover" 
        quality={100} 
    />
    )
}