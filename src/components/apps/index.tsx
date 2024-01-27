'use client'

import { useSelector } from 'react-redux'
import { APP_DATA_TYPE, AVAILABLE_APPS } from '@/data/const'
import { STORE_DATA_TYPE } from '@/data/store'

import { Calculator } from './calculator'
import { Alarm } from './alarm'
import { Game } from './game'
import { Browser } from './browser'


export function Apps() {

    const apps = useSelector((state: STORE_DATA_TYPE) => state.apps)

    return apps && (
        <div className="w-full h-full relative">
            {
                apps.map((data: APP_DATA_TYPE) => {
                    if(data.name === AVAILABLE_APPS[0]) return <Calculator data={data} />
                    if(data.name === AVAILABLE_APPS[1]) return <Alarm data={data} />
                    if(data.name === AVAILABLE_APPS[2]) return <Game data={data} />
                    if(data.name === AVAILABLE_APPS[3]) return <Browser data={data} />
                })
            }
        </div>
    )

}