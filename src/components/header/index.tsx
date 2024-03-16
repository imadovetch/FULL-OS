"use client"

import { useEffect, useState } from 'react'
import { I, Title } from '@/components'
import { AVAILABLE_APPS } from '@/data/const'
import { useDispatch, useSelector } from 'react-redux'
import { APPS_ACTIONS } from '@/data/store/apps'
import { STORE_DATA_TYPE } from '@/data/store'

export function Header() {

    return (
        <div className="bg-dark-t flex items-center z-50 justify-between">
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
                            className={`btn-simple relative group ${active_apps.includes(name) ? 'active' : 'hidden'}`}
                            onClick={() => {  dispatch(APPS_ACTIONS.SWITCH_DISPLAY({ name })) }}
                        >
                            <Title text={name} side="bottom" />
                            <I type={name} />
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
            <div className="flex items-center gap-1 font-bold">
                <span>{funcGetHour()}</span>
                <span>:</span>
                <span>{funcGetMin()}</span>
                <span>{funcGetPeriod()}</span>
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
                        ? <I type='online' />
                        : <I type='offline' />
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
