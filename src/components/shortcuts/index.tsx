import { useEffect, useState } from 'react'
import { I, Title } from '@/components'
import { AVAILABLE_APPS } from '@/data/const'
import { useDispatch, useSelector } from 'react-redux'
import { APPS_ACTIONS } from '@/data/store/apps'
import { APP_ICONS } from '@/data/store/icons'
import { STORE_DATA_TYPE } from '@/data/store'

export function Shortcuts() {
    const dispatch = useDispatch()
    const [iconcatched, seticonc] = useState<number | null>(null)
    const apps = useSelector((state: STORE_DATA_TYPE) => state.apps)
    const icons = useSelector((state: STORE_DATA_TYPE) => state.icons)
    const active_apps = apps.map(app => app.name)

    function icondraged(e:any,index: number) {
        
        seticonc(index)
    }

    function placetochange(e:any,index: number) {
        if (iconcatched !== null && index !== iconcatched) {
            const temp = AVAILABLE_APPS[index]
            AVAILABLE_APPS[index] = AVAILABLE_APPS[iconcatched]
            AVAILABLE_APPS[iconcatched] = temp
            seticonc(null)
        }
    }

    return (
        <div className='w-3/5 m-auto grid grid-cols-5 z-30 gap-8 items-start h-56'>
        {AVAILABLE_APPS.map((name, index) => (
            <button
                onMouseDown={(e) => icondraged(e, index)}
                onMouseUp={(e) => placetochange(e, index)}
                key={name}
                style={{ background: `${icons.COLER}` }}
                className={`mx-auto iconholder flex justify-center items-center appsbackground rounded-lg p-4 hover:cursor-pointer ${active_apps.includes(name) ? 'active' : ''} ${index >= AVAILABLE_APPS.length - 2 ? 'col-span-2 text-center' : ''}`}
                onClick={() => active_apps.includes(name) ? dispatch(APPS_ACTIONS.SWITCH_DISPLAY({ name })) : dispatch(APPS_ACTIONS.OPEN({ appName: name }))}
            >
                <Title text={name} side="top" />
                <I type={name} size={30} className={'icon fill-app-light text-app-light'} />
            </button>
        ))}
    </div>
    

    )
}
