"use client"

import { useEffect, useState } from 'react'
import { I } from '@/components'
import { AVAILABLE_APPS } from '@/data/const'
import { useDispatch } from 'react-redux'
import { APPS_ACTIONS } from '@/data/store/apps'

export function Header() {

    const [expand, setExpand] = useState(false)

    return (
        <div
            className={`absolute w-full bg-dark-t flex items-center justify-between backdrop-blur-md shadow-md z-50 duration-300 ${expand ? '' : '-translate-y-full'}`}
            onMouseLeave={() => setExpand(false)}
        >
            <div
                className={`absolute h-full w-full flex items-center justify-center translate-y-full duration-300 ${expand ? 'opacity-0' : ''}`}
                onMouseEnter={() => setExpand(true)}
            >
                <I type="more" size={30}/>
            </div>
            <Apps />
            <Information />
        </div>
    )

}

function Apps() {

    const dispatch = useDispatch()
    
    return (
        <div className="flex items-center">
            {
                AVAILABLE_APPS.map(name => {
                    return (
                        <button
                            key={name}
                            className="btn-simple"
                            title={name}
                            onClick={() => dispatch(APPS_ACTIONS.OPEN({ appName: name }))}
                        >
                            <I type={name}/>
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
