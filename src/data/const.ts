// Constants 

export const WALLPAPER_LINK = "/wallpaperflare.com_wallpaper.jpg"
export const BACKEND_LINK = "https://full-os-backhosted-production.up.railway.app/"

// Available applications
export const AVAILABLE_APPS = ['manager', 'calculator', 'camera', 'game', 'browser','chat','store','weather','yourlink','Settings','Gallery','Yomahoot']
export type APP_DATA_TYPE = {
    id: number,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    hide: boolean,
    fullscreen: boolean,
    data: any,
    prorite : boolean
}