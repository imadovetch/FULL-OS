import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const NAME = "GAMES"
const INIT_DATA = {
    name: '',
}

const s = createSlice({
    name: NAME,
    initialState: INIT_DATA,
    reducers: {
        OPENGAME(state: any, action: PayloadAction<{GAMEname:string}>){
            state.name = action.payload.GAMEname
            return state
        }
    }
})

export const SETTINGS_ACTIONS = s.actions 
export default s.reducer 