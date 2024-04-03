import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WALLPAPER_LINK } from "@/data/const"
const NAME = "AppICONS";
const INIT_DATA = {
    COLER:"var(--app-dark)",
}
const s = createSlice({
    name:NAME,
    initialState:INIT_DATA,
    reducers:{
        UPDATEicon(state:any,action:PayloadAction<{COLER:string}>){
            console.log(action.payload.COLER + ",nklnp")
            return {
                ...state,
                COLER: action.payload.COLER 
              };
        }
    }
})
export const APP_ICONS = s.actions;
export default s.reducer;