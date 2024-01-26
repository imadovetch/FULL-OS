"use client"

import { useEffect, useState } from 'react'
import { I } from '@/components'
import { APPS } from '@/data/const'

export function Header() {

    const [expand, setExpand] = useState(false)

    return (
        <div
            className={`bg-shadow-light flex items-center justify-between gap-2 backdrop-blur-md shadow p-4 z-50 duration-300 ${expand ? 'h-[60px]' : 'h-[40px]'}`}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
        >
            <Apps />
            <Information />
        </div>
    )

}

function Apps() {

    return (
        <div className="flex items-center gap-2">
            {
                APPS.map(app => {
                    return (
                        <div className="group cursor-pointer relative flex items-center justify-center bg-shadow-light w-[30px] h-[30px] rounded-md">
                            <I type={app.icon}/>
                            <span className="group-hover:opacity-100 group-hover:rotate-0 rotate-45 opacity-0 duration-300 absolute left-1/2 -translate-x-1/2 -bottom-2 translate-y-full capitalize text-sm bg-light text-dark rounded-full px-2">
                                {app.name}
                            </span>
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
        <div className="flex items-center gap-4">
            <Connection />
            <CurrentTime />
        </div>
    )

}
