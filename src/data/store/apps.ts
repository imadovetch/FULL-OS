import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { APP_DATA_TYPE } from "@/data/const"

const SLICE_NAME = 'APPS'
const DATA_INIT: APP_DATA_TYPE[] = []
const max = 50
const min = 0
const s = createSlice({

    name: SLICE_NAME,
    initialState: DATA_INIT,
    reducers: {
        // LOAD(state: any, action: PayloadAction<any>) {
        //     if(action.payload) return action.payload
        //     if(localStorage.getItem(SLICE_NAME)) return JSON.parse(localStorage.getItem(SLICE_NAME)??'')
        //     return SETTINGS_DATA_INIT
        // },
        // SAVE(state: any){
        //     localStorage.setItem(SLICE_NAME, JSON.stringify(state))
        // },
        OPEN(state: APP_DATA_TYPE[], action: PayloadAction<{ appName: string }>) {
            state.push({
                id: new Date().getTime(),
                name: action.payload.appName,
                x: Math.floor(Math.random() * (1380 - 0) + 0),
                y: Math.floor(Math.random() * (max - min) + min),
                width: 500,
                height: 500,
                hide: false,
                fullscreen: false,
                data: null
            })
            return state
        },
        UPDATE(state: APP_DATA_TYPE[], action: PayloadAction<{ id: number, newProps: {} }>){
            return state.map(app => {
                return app.id === action.payload.id ? {
                    ...app,
                    ...action.payload.newProps
                } : app
            })
        },
        CLOSE(state: APP_DATA_TYPE[], action: PayloadAction<{ id: number }>){
            return state.filter(app => app.id !== action.payload.id)
        },
        SWITCH_DISPLAY(state: APP_DATA_TYPE[], action: PayloadAction<{ name: string }>){
            return state.map(app => {
                return app.name === action.payload.name ? {
                    ...app,
                    hide: !app.hide
                } : app
            })
        },
        RESIZE(state:APP_DATA_TYPE[],action :PayloadAction<{ id :number, newProps:{} }>){
            return state.map(app =>{
                return app.id === action.payload.id ? {
                    ...app,
                    ...action.payload.newProps
                } : app
            })
        },
    }

})

export const APPS_ACTIONS = s.actions
export default s.reducer