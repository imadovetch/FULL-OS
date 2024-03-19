// Constants 

export const WALLPAPER_LINK = "/wallpaperflare.com_wallpaper.jpg"

// Available applications
export const AVAILABLE_APPS = ['manager', 'calculator', 'camera', 'game', 'browser','chat','store']
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