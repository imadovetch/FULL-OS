// Constants 

export const WALLPAPER_LINK = "/wallpaperflare.com_wallpaper.jpg"

// Available applications
export type APP_TYPE = {
    id: string,
    icon: string,
    name: string
}
export type APPS_TYPE = APP_TYPE[]
export const APPS: APPS_TYPE = [
    {
        id: 'apps_calculator',
        icon: 'calculator',
        name: 'calculator'
    },
    {
        id: 'apps_alarm',
        icon: 'alarm',
        name: 'alarm'
    },
    {
        id: 'apps_game',
        icon: 'game',
        name: 'game'
    },
    {
        id: 'apps_browser',
        icon: 'browser',
        name: 'browser'
    }
]
// End available applications