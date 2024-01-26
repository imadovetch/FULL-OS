import Image from "next/image"
import { WALLPAPER_LINK } from "@/data/const"

export function Wallpaper(){
    return (
        <Image
            className="fixed -z-10 w-full h-full object-cover"
            src={WALLPAPER_LINK}
            alt={"wallpaper"}
            width={1000}
            height={1000}
            quality={100}
        />
    )
}