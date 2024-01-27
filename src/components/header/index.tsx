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
            className={`absolute w-full bg-shadow-light flex items-center justify-between gap-2 backdrop-blur-md shadow z-50 duration-300 ${expand ? '' : '-translate-y-full'}`}
            onMouseLeave={() => setExpand(false)}
        >
            <div
                className={`absolute h-full w-full flex items-center justify-center translate-y-full duration-300 ${expand ? 'opacity-0 rotate-180' : ''}`}
                onMouseEnter={() => setExpand(true)}
            >
                <I type="more" />
            </div>
            <Apps />
            <Information />
        </div>
    )

}

function Apps() {

    const dispatch = useDispatch()
    const [title, setTitle] = useState<{ x: number, y: number, name: string } | null>(null)
    const funcShowBudge = (e: any, name: string) => {
        setTitle({x: e.clientX, y: e.clientY, name})
    }

    return (
        <div className="flex items-center pl-4">
            {
                title &&
                <span
                    className="absolute -translate-x-1/2 translate-y-1/2 bg-light text-dark capitalize text-sm rounded-md px-2 opacity-50 animate-open"
                    style={{
                        left: title.x,
                        top: title.y
                    }}
                >
                    {title.name}
                </span>
            }
            {
                AVAILABLE_APPS.map(name => {
                    return (
                        <div
                            className="group hover:animate-move cursor-pointer relative flex items-center justify-center h-full p-2"
                            onClick={() => dispatch(APPS_ACTIONS.OPEN({ appName: name }))}
                            onMouseEnter={(e) => funcShowBudge(e, name)}
                            onMouseLeave={() => setTitle(null)}
                        >
                            <I type={name} />
                        </div>
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
