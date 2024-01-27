import { configureStore } from '@reduxjs/toolkit'
import apps from './apps'

export const store = configureStore({
    reducer: {
        apps
    }
})

export type STORE_DATA_TYPE = ReturnType<typeof store.getState>