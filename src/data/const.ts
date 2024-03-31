// Constants 

export const WALLPAPER_LINK = "/wallpaperflare.com_wallpaper.jpg"
export const BACKEND_LINK = "http://localhost:8000/"
const test = 1
// Available applications
export const AVAILABLE_APPS = ['manager', 'calculator', 'camera', 'game', 'browser','chat','store','weather','yourlink']
export type APP_DATA_TYPE = {
    id: number,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    hide: boolean,
    fullscreen: boolean,
    data: any
}