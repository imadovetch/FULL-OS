import { configureStore } from '@reduxjs/toolkit'
import apps from './apps'
import settings from './settings'
import AppContainer from './AppContainer'
import icons from './icons'
import NotifColers from './NotifColers'

export const store = configureStore({
    reducer: {
        apps,
        settings,
        AppContainer,
        icons,
        NotifColers
    }
})

export type STORE_DATA_TYPE = ReturnType<typeof store.getState>