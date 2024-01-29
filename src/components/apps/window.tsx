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
        console.log(data.x,data.y)
        dispatch(APPS_ACTIONS.UPDATE({
            id: data.id,
            newProps: {
                fullscreen: !data.fullscreen,
                x: 0,
                y: 0,
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
        if (data.hide) gsap.to(window.current, {
            rotate: 15,
            scale: 0,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            duration: .5,
        })
    }, { scope: window, dependencies: [data.hide] })

    useGSAP(() => {

        if (data.fullscreen) {
            gsap.fromTo(window.current, {
                x: data.x,
                y: data.y,
                width: data.width,
                height: data.height,
            }, {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                duration: 1,
            })
        }

    }, { scope: window, dependencies: [data.fullscreen] })

    return (
        <div
            ref={window}
            className={`select-none bg-dark origin-center absolute flex flex-col z-50 rounded-md shadow-md`}
            style={
                !data.fullscreen ? {
                    left: data.x,
                    top: data.y,
                    width: data.width,
                    height: data.height,
                } : {}
            }
        >

            { data.fullscreen && <Effect />}

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

function Effect() {

    const effect = useRef(null)

    useGSAP(() => {
        gsap.from('.arrow', {rotate: 90, scale: 0.5, stagger: 0.1, borderRadius: 100, filter: 'brightness(18)', duration: 0.1})
    }, {scope: effect})

    return (
        <div
            ref={effect}
            className="absolute bg-primary w-full h-full pointer-events-none -z-50"
        >
            <div className="arrow absolute w-[60px] h-[60px] -top-[30px] -left-[30px] border-[20px] border-primary border-b-transparent border-r-transparent shadow-[-10px_-10px_0px_5px] shadow-light"></div>
            <div className="arrow absolute w-[60px] h-[60px] -bottom-[30px] -left-[30px] border-[20px] border-primary border-t-transparent border-r-transparent shadow-[-10px_10px_0px_5px] shadow-light"></div>
            <div className="arrow absolute w-[60px] h-[60px] -top-[30px] -right-[30px] border-[20px] border-primary border-b-transparent border-l-transparent shadow-[10px_-10px_0px_5px] shadow-light"></div>
            <div className="arrow absolute w-[60px] h-[60px] -bottom-[30px] -right-[30px] border-[20px] border-primary border-t-transparent border-l-transparent shadow-[10px_10px_0px_5px] shadow-light"></div>
        </div>
    )
}