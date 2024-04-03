
import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WALLPAPER_LINK } from "@/data/const"
const NAME = "NotifColers.ts";
const INIT_DATA = {
    COLER:"linear-gradient(to right, #F5F5F5, #E0E0E0)",
}
const s = createSlice({
    name:NAME,
    initialState:INIT_DATA,
    reducers:{
        UPDATEnotif(state:any,action:PayloadAction<{COLER:string}>){
            console.log(action.payload.COLER + ",nklnp")
            return {
                ...state,
                COLER: action.payload.COLER 
              };
        }
    }
})
export const APP_NOTIF = s.actions;
export default s.reducer;