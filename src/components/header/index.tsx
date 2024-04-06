"use client"

import { useEffect, useState } from 'react'
import { I, Title } from '@/components'
import { AVAILABLE_APPS } from '@/data/const'
import { useDispatch, useSelector } from 'react-redux'
import { APPS_ACTIONS } from '@/data/store/apps'
import { STORE_DATA_TYPE } from '@/data/store'
import {default as Notifications} from "./notification"
import {default as Navnotif} from "./Navnotif"

export function Header() {
    const [ expandnotif , setexpandnotif] = useState(false)
    
    function expanthenotif(){
        setexpandnotif(!expandnotif)
    }
    return (
        <div
        onMouseDown={expanthenotif}
        
        className="bg-app-dark w-full   relative  hover:cursor-grab flex items-center z-30 justify-between px-2">
            {
                expandnotif &&

            <Navnotif/>
            }
            <Apps />
            <Information />
        </div>
    )

}

function Apps() {

    const dispatch = useDispatch()
    const apps = useSelector((state: STORE_DATA_TYPE) => state.apps)
    const active_apps = apps.map(app => app.name)

    return (
        <div className="flex h-8  items-center">
            {
                AVAILABLE_APPS.map(name => {
                    return (
                        <button
                            key={name}
                            className={` btn-simple  relative group ${active_apps.includes(name) ? 'active' : 'hidden'}`}
                            onClick={() => {  dispatch(APPS_ACTIONS.SWITCH_DISPLAY({ name })) }}
                        >
                            <Title text={name} side="bottom" />
                            <I type={name} className={'text-app-light'} />
                        </button>
                    )
                })
            }
        </div>
    )

}

function Information() {

    function CurrentTime() {

        const [render, setRender] = useState(false)

        const date = new Date()
        const addZero = (n: number) => n < 10 ? `0${n}` : `${n}`
        const funcGetHour = () => addZero(date.getHours() % 12 || 12)
        const funcGetMin = () => addZero(date.getMinutes())
        const funcGetPeriod = () => date.getHours() >= 12 ? 'PM' : 'AM'

        useEffect(() => {
            setInterval(() => setRender(state => !state), 60000)
        }, [])

        return (
            <div className="flex h-8   items-center gap-1 font-bold text-app-light">
                <div>{funcGetHour()}</div>
                <div>:</div>
                <div>{funcGetMin()}</div>
                <div>{funcGetPeriod()}</div>
            </div>
        )
    }

    function Connection() {

        const [connection, setConnection] = useState(true)

        useEffect(() => {
            navigator.onLine ? setConnection(true) : setConnection(false)
            setInterval(() => navigator.onLine ? setConnection(true) : setConnection(false), 1000)
        }, [])

        return (
            <div>
                {
                    connection
                        ? <I type='online' className='text-app-light' />
                        : <I type='offline' className='text-app-light'/>
                }
            </div>
        )

    }

    return (
        <div className="flex items-center gap-4 pr-4">
            <Connection />
            <CurrentTime />
        </div>
    )

}
