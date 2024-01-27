import { useDispatch, useSelector } from "react-redux"
import { STORE_DATA_TYPE } from "@/data/store"
import { SETTINGS_ACTIONS } from "@/data/store/settings"

export function Settings(){

    const settings = useSelector((store:STORE_DATA_TYPE) => store.settings)
    const dispatch = useDispatch()

    return (
        <div 
            onClick={() => dispatch(SETTINGS_ACTIONS.CHANGE_THEME({theme: 'light'}))}
        >
            {settings.theme}
        </div>
    )
}