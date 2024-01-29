"use client"

import { useEffect, useRef, useState } from 'react'
import { I } from '@/components'
import { AVAILABLE_APPS } from '@/data/const'
import { useDispatch } from 'react-redux'
import { APPS_ACTIONS } from '@/data/store/apps'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Header() {

    const [display, setDisplay] = useState(false)
    const navbar = useRef(null)
    const sensor = useRef(null)

    useGSAP(() => {
        if (display) {
            gsap.to(navbar.current, { yPercent: 0, duration: 0.5 })
            gsap.to(sensor.current, { opacity: 0, duration: 0.5 })
        } else {
            gsap.to(navbar.current, { yPercent: -100, duration: 0.5 })
            gsap.to(sensor.current, { opacity: 1, duration: 0.5 })
        }
    }, {dependencies: [display]})

    return (
        <div
            ref={navbar}
            className=" bg-dark flex items-center justify-between w-full z-[1000]"
            onMouseLeave={() => setDisplay(false)}
            onMouseEnter={() => setDisplay(true)}
        >
            <div
                ref={sensor}
                className="sensor absolute flex items-center justify-center h-full w-full translate-y-full"

            >
                <I type="more" size={30} />
            </div>
            <Apps display={display} />
            <Information />
        </div>
    )

}

function Apps({ display }: { display: boolean }) {

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
