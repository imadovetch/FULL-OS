'use client'

import { useDispatch } from "react-redux"
import { I } from "@/components"
import { APP_DATA_TYPE } from "@/data/const"
import { APPS_ACTIONS } from "@/data/store/apps"
import { useGSAP } from "@gsap/react"
import { useRef , useEffect, useState } from "react"
import gsap from "gsap"

export function Window({
    data,
    children,
}: Readonly<{
    data: APP_DATA_TYPE,
    children: React.ReactNode
}>) {

    const dispatch = useDispatch()
    const windowref = useRef(null)

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
        if (data.hide) gsap.to(windowref.current, {
            rotate: 15,
            scale: 0,
            duration: .5,
        }); else gsap.to(windowref.current, {
            rotate: 0,
            scale: 1,
            duration: .5,
        })
    }, { scope: windowref, dependencies: [data.hide] })

    useGSAP(() => {

        if (data.fullscreen) {
            gsap.fromTo(windowref.current, {
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

    }, { scope: windowref, dependencies: [data.fullscreen] })
    
    const [isDragging, setIsDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [startWidth, setStartWidth] = useState(null);
  const [startHeight, setStartHeight] = useState(null);
  const [resizePosition, setResizePosition] = useState(null);

  useEffect(() => {
    if (isDragging) {
      document.documentElement.addEventListener('mousemove', Resize);
      document.documentElement.addEventListener('mouseup', handleMouseUp);
    } else {
      document.documentElement.removeEventListener('mousemove', Resize);
      document.documentElement.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.documentElement.removeEventListener('mousemove', Resize);
      document.documentElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  function handleMouseUp() {
    setIsDragging(false);
    setResizing(!resizing);
    setResizePosition(null);
    setStartX(null)
    setStartY(null)
    setStartWidth(null)
    setStartHeight(null)
  }

  function Resize(event) {
    console.log(resizePosition);
    if (!startX || !startY || !startWidth || !startHeight || !resizePosition) return;

    const diffX = event.clientX - startX;
    const diffY = event.clientY - startY;

    let finalWidth = startWidth + diffX;
    let finalHeight = startHeight + diffY;

    // Ensure final width and height are at least 500
    finalWidth = Math.max(finalWidth, 500);
    finalHeight = Math.max(finalHeight, 500);

    switch (resizePosition) {
        case 'top':
            dispatch(
                APPS_ACTIONS.UPDATE({
                    id: data.id,
                    newProps: {
                        y: data.y + diffY,
                        height: (startHeight - diffY) > 500 ? startHeight - diffY : 500,
                    },
                })
            );
            break;
        case 'left':
            dispatch(
                APPS_ACTIONS.UPDATE({
                    id: data.id,
                    newProps: {
                        x: data.x + diffX,
                        width: (startWidth - diffX) > 500 ? startWidth - diffX : 500,
                    },
                })
            );
            break;
        case 'right':
            dispatch(
                APPS_ACTIONS.UPDATE({
                    id: data.id,
                    newProps: {
                        width: finalWidth,
                    },
                })
            );
            break;
        case 'bottom':
            dispatch(
                APPS_ACTIONS.UPDATE({
                    id: data.id,
                    newProps: {
                        height: finalHeight,
                    },
                })
            );
            break;
        default:
            break;
    }
}



  function handleMouseDown(position, event) {
    setIsDragging(true);
    console.log(position + 'j')
    setResizePosition(position);
    setStartX(event.clientX);
    setStartY(event.clientY);
    
    setStartWidth(data.width);
    setStartHeight(data.height);
  }
  function resizehovred(position, event){
    
  }
    return (
        <div
            
            ref={windowref}
            
            className={`  windowshadow   overflow-hidden select-none bg-app-dark origin-center absolute flex flex-col z-40 rounded-md `}
            style={
             !data.fullscreen ? {
                    left: data.x,
                    top: data.y,
                    width: data.width,
                    height: data.height,
                } : {}
            }
        >
            <div>
            <div 
    onMouseMove={(event) => resizehovred('left', event)}
    onMouseDown={(event) => handleMouseDown('left', event)} 
    className="hover:cursor-e-resize bg-app---dark absolute h-full w-1 z-50 top-0 left-0"
></div>
<div 
    onMouseDown={(event) => handleMouseDown('right', event)} 
    className="hover:cursor-e-resize bg-app---dark  absolute h-full z-50 w-1 top-0 right-0"
></div>
<div
    onMouseDown={(event) => handleMouseDown('top', event)}
    className="hover:cursor-ns-resize bg-app---dark absolute h-1 z-50 w-full top-0"
></div>
<div 
    onMouseDown={(event) => handleMouseDown('bottom', event)} 
    className="hover:cursor-ns-resize bg-app---dark absolute h-1 z-50 w-full bottom-0"
></div>

    </div>
                { data.fullscreen && <Effect />}

            <div
                className="bg-app-dark flex items-center pr-2  justify-between"
                onMouseDown={funcUpdatePosition}
            >

                <div className="flex items-center  p-2">
                    <I type={data.name} />
                    <span className="capitalize text-app--light font-bold px-2">{data.name}</span>
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
            <div className={`  cursor-${resizing} relative border-t border-inherit   h-full`}  >
            {children}
            </div>
            

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
            className="absolute w-full h-full pointer-events-none -z-50"
        >
            <div className="arrow absolute w-[60px] h-[60px] -top-[30px] -left-[30px] border-[20px] border-primary border-b-transparent border-r-transparent shadow-[-10px_-10px_0px_5px] shadow-light"></div>
            <div className="arrow absolute w-[60px] h-[60px] -bottom-[30px] -left-[30px] border-[20px] border-primary border-t-transparent border-r-transparent shadow-[-10px_10px_0px_5px] shadow-light"></div>
            <div className="arrow absolute w-[60px] h-[60px] -top-[30px] -right-[30px] border-[20px] border-primary border-b-transparent border-l-transparent shadow-[10px_-10px_0px_5px] shadow-light"></div>
            <div className="arrow absolute w-[60px] h-[60px] -bottom-[30px] -right-[30px] border-[20px] border-primary border-t-transparent border-l-transparent shadow-[10px_10px_0px_5px] shadow-light"></div>
        </div>
    )
}


