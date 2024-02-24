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
                    console.log(data.name + 'g');
                    if(data.name === AVAILABLE_APPS[0]) return <Browser key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[1]) return <Calculator key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[2]) return <Alarm key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[3]) return <Game key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[4]) return <Browser key={data.id} data={data} />
                    // ['manager', 'calculator', 'alarm', 'game', 'browser']
                })
            }
        </div>
    )

}