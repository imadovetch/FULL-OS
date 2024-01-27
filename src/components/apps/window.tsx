'use client'

import { useDispatch } from "react-redux"
import { I } from "@/components"
import { APP_DATA_TYPE } from "@/data/const"
import { APPS_ACTIONS } from "@/data/store/apps"


export function Window({
    data,
    children,
}: Readonly<{
    data: APP_DATA_TYPE,
    children: React.ReactNode
}>) {

    const dispatch = useDispatch()
    const funcUpdatePosition = (event: any) => {
        const [shiftX, shiftY] = [event.clientX - data.x, event.clientY - data.y]
        const move = (event: any) => {
            dispatch(APPS_ACTIONS.UPDATE({
                id: data.id,
                newProps: {
                    x: event.clientX - (data.fullscreen ? data.x : shiftX),
                    y: event.clientY - (data.fullscreen ? 0 : shiftY),
                    fullscreen: false
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
    const funcHide = () => {
        dispatch(APPS_ACTIONS.UPDATE({
            id: data.id,
            newProps: {
                hide: !data.hide,
            }
        }))
    }
    const funcFullScreen = () => {
        dispatch(APPS_ACTIONS.UPDATE({
            id: data.id,
            newProps: {
                fullscreen: !data.fullscreen,
            }
        }))
    }
    const funcClose = () => {
        dispatch(APPS_ACTIONS.CLOSE({
            id: data.id,
        }))
    }

    return (
        <div
            className={`bg-dark absolute z-50 rounded-md shadow-md ${data.hide ? 'animate-hide' : 'animate-open'}`}
            style={{
                left: data.fullscreen ? 0 : data.x,
                top: data.fullscreen ? 0 : data.y,
                width: data.fullscreen ? '100%' : data.width,
                height: data.fullscreen ? '100%' : data.height,
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
                    <button className="btn-simple" onClick={funcHide}>
                        <I type="minimize" />
                    </button>
                    <button className="btn-simple" onClick={funcFullScreen}>
                        <I type="maximize" />
                    </button>
                    <button className="btn-simple" onClick={funcClose}>
                        <I type="close" />
                    </button>
                </div>

            </div>

            {children}

        </div>
    )
}
