// Constants 

export const WALLPAPER_LINK = "/wallpaperflare.com_wallpaper.jpg"

// Available applications
export const AVAILABLE_APPS = ['manager', 'calculator', 'alarm', 'game', 'browser']
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