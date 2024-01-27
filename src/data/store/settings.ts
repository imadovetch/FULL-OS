import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const NAME = "SETTINGS"
const INIT_DATA = {
    theme: 'dark',
    volume: 0
}

const s = createSlice({
    name: NAME,
    initialState: INIT_DATA,
    reducers: {
        CHANGE_THEME(state: any, action: PayloadAction<{theme: 'dark' | 'light'}>){
            state.theme = action.payload.theme
            return state
        }
    }
})

export const SETTINGS_ACTIONS = s.actions // useDispatch
export default s.reducer // useSelector