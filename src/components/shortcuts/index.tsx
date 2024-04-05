"use client"

import { useEffect, useState } from 'react'
import { I, Title } from '@/components'
import { AVAILABLE_APPS } from '@/data/const'
import { useDispatch, useSelector } from 'react-redux'
import { APPS_ACTIONS  } from '@/data/store/apps'
import { APP_ICONS  } from '@/data/store/icons'
import { STORE_DATA_TYPE } from '@/data/store'

export function Shortcuts(){

    const dispatch = useDispatch()
    const apps = useSelector((state: STORE_DATA_TYPE) => state.apps)
    const icons = useSelector((state: STORE_DATA_TYPE) => state.icons)
    const active_apps = apps.map(app => app.name)
    
    return (
       <div className='    w-3/5 m-auto grid  grid-cols-8 z-30  items-start h-56'>
            {
                AVAILABLE_APPS.map(name => {
                    return (
                        <button
                            key={name}
                            style={{
                                background: `${icons.COLER}`,
                              }}
                            className={`mx-auto  iconholder flex ))} to-green-400  justify-center items-center appsbackground rounded-lg p-4   hover:cursor-pointer  ${active_apps.includes(name) ? 'active' : ''}`}
                            onClick={() => { active_apps.includes(name) ? dispatch(APPS_ACTIONS.SWITCH_DISPLAY({ name })) : dispatch(APPS_ACTIONS.OPEN({ appName: name }))}}
                        >
                            <Title text={'chat'} side="top" />
                            <I type={name} size={30} className={'icon fill-app-light text-app-light '} />
                        </button>
                    )
                })
            }
       </div>
    )
}