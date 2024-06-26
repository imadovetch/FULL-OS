// to add new icons : https://react-icons.github.io/react-icons/

import { CiWifiOn, CiWifiOff } from "react-icons/ci"
import { CgSmileNone } from "react-icons/cg"
import { ImCalculator } from "react-icons/im"
import { BsFillAlarmFill } from "react-icons/bs"
import { IoGameController, IoBrowsers } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"
import { VscChromeMaximize } from "react-icons/vsc"
import { VscChromeMinimize } from "react-icons/vsc"
import { TbMenu  } from "react-icons/tb"
import { SiHiveBlockchain } from "react-icons/si"
import { FaChessBishop } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiLinkerd } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
export function I({
    type,
    size = 20,
    className = 'text-app-light fill-app-light'
}: {
    type: string,
    size?: 20 | 30 | 40 | 50,
    className?: string
}) {
    switch (type) {
        case 'online':
            return <CiWifiOn size={size} className={className} />
        case 'offline':
            return <CiWifiOff size={size} className={className} />
        case 'calculator':
            return <ImCalculator size={size} className={className} />
        case 'alarm':
            return <BsFillAlarmFill size={size} className={className} />
        case 'game':
            return <FaChessBishop size={size} className={className} />
        case 'browser':
            return <IoBrowsers size={size} className={className} />
        case 'minimize':
            return <VscChromeMinimize size={size} className={className} />
        case 'maximize':
            return <VscChromeMaximize size={size} className={className} />
        case 'close':
            return <IoMdClose size={size} className={className} />
        case 'more':
            return <TbMenu size={size} className={className} />
        case 'chat':
            return <IoChatbubbles size={size} className={className} />
        case 'manager':
            return <SiHiveBlockchain size={size} className={className} />
        case 'store':
            return <MdLocalGroceryStore size={size} className={className} />
        case 'camera':
            return <FaCamera size={size} className={className} />
        case 'weather':
                return <TiWeatherPartlySunny size={size} className={className} />
        case 'yourlink':
                return <SiLinkerd size={size} className={className} />
        case 'Settings':
                return <IoSettingsOutline size={size} className={className} />
        case 'Gallery':
            return <GrGallery size={size} className={className} />
        case 'Yomahoot':   
        return <MdQuiz size={size} className={className} />
            default:
            return <CgSmileNone />
    }
}