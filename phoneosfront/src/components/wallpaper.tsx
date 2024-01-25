import Image from "next/image"
import { BACKGROUND_IMAGE } from "@/data/const"

export function Wallpaper(){
    return (
        <Image
            className="fixed w-full h-full object-cover"
            src={BACKGROUND_IMAGE}
            alt={"wallpaper"}
            width={1000}
            height={1000}
            quality={100}
        />
    )
}