import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WALLPAPER_LINK } from "@/data/const"
const NAME = "AppContainer";
const INIT_DATA = {
    BG:WALLPAPER_LINK,
    DISPLAY:"flex flex-col"
}
const s = createSlice({
    name:NAME,
    initialState:INIT_DATA,
    reducers:{
        UPDATEBG(state:any,action:PayloadAction<{BGchoosed:string}>){
            console.log(action.payload.BGchoosed + ",nklnp")
            return {
                ...state,
                BG: action.payload.BGchoosed 
              };
        }
    }
})
export const APP_CONTAINER = s.actions;
export default s.reducer;
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// const NAME = "SETTINGS"
// const INIT_DATA = {
//     theme: 'dark',
//     volume: 0
// }

// const s = createSlice({
//     name: NAME,
//     initialState: INIT_DATA,
//     reducers: {
//         CHANGE_THEME(state: any, action: PayloadAction<{theme: 'dark' | 'light'}>){
//             state.theme = action.payload.theme
//             return state
//         }
//     }
// })

// export const SETTINGS_ACTIONS = s.actions // useDispatch
// export default s.reducer // useSelector