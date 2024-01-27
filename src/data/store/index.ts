import { configureStore } from '@reduxjs/toolkit'
import apps from './apps'
import settings from './settings'

export const store = configureStore({
    reducer: {
        apps,
        settings
    }
})

export type STORE_DATA_TYPE = ReturnType<typeof store.getState>