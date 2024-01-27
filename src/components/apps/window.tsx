'use client'

import { useDispatch } from "react-redux"
import { I } from "@/components"
import { APP_DATA_TYPE } from "@/data/const"
import { APPS_ACTIONS } from "@/data/store/apps"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

export function Window({
    data,
    children,
}: Readonly<{
    data: APP_DATA_TYPE,
    children: React.ReactNode
}>) {

    const dispatch = useDispatch()
    const window = useRef(null)

    const funcUpdatePosition = (event: any) => {

        const [shiftX, shiftY] = [event.clientX - data.x, event.clientY - data.y]

        const move = (event: any) => {
            dispatch(APPS_ACTIONS.UPDATE({
                id: data.id,
                newProps: {
                    x: event.clientX - shiftX,
                    y: event.clientY - shiftY,
                }
            }))
        }
        const rest = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', rest)
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', rest)
    }
    const funcHide = (e: any) => {
        e.stopPropagation()
        dispatch(APPS_ACTIONS.UPDATE({
            id: data.id,
            newProps: {
                hide: !data.hide,
            }
        }))
    }
    const funcFullScreen = (e: any) => {
        e.stopPropagation()
        dispatch(APPS_ACTIONS.UPDATE({
            id: data.id,
            newProps: {
                fullscreen: !data.fullscreen,
            }
        }))
    }
    const funcClose = (e: any) => {
        e.stopPropagation()
        dispatch(APPS_ACTIONS.CLOSE({
            id: data.id,
        }))
    }

    useGSAP(() => {
        gsap.from(window.current, {
            rotate: 15,
            scale: 0,
            duration: .5,
            ease: 'power2'
        })
    }, { scope: window })

    useGSAP(() => {
        if (data.hide) gsap.to(window.current, {
            rotate: 15,
            scale: 0,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            duration: .5,
            ease: 'power2'
        })
    }, { scope: window, dependencies: [data.hide] })

    useGSAP(() => {
        if (data.fullscreen) gsap.to(window.current, {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            duration: .5,
            ease: 'power2'
        })
        else gsap.to(window.current, {
            top: data.x,
            left: data.y,
            width: data.width,
            height: data.height,
            duration: .5,
            ease: 'power2'
        })
    }, { scope: window, dependencies: [data.fullscreen] })

    return (
        <div
            ref={window}
            className={`select-none bg-dark origin-center absolute flex flex-col z-50 rounded-md shadow-md`}
            style={{
                left: data.x,
                top: data.y,
                width: data.width,
                height: data.height,
            }}
        >

            <div
                className="bg-dark-t flex items-center justify-between"
                onMouseDown={funcUpdatePosition}
            >

                <div className="flex items-center p-2">
                    <I type={data.name} />
                    <span className="capitalize font-bold px-2">{data.name}</span>
                </div>

                <div className="flex">
                    <button className="btn-simple" onMouseDown={funcHide}>
                        <I type="minimize" />
                    </button>
                    <button className="btn-simple" onMouseDown={funcFullScreen}>
                        <I type="maximize" />
                    </button>
                    <button className="btn-simple" onMouseDown={funcClose}>
                        <I type="close" />
                    </button>
                </div>

            </div>

            {children}

        </div>
    )

}
