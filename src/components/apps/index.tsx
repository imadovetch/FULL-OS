'use client'

import { useSelector } from 'react-redux'
import { APP_DATA_TYPE, AVAILABLE_APPS } from '@/data/const'
import { STORE_DATA_TYPE } from '@/data/store'

import { Calculator } from './calculator'
import { Camera } from './camera'
import { Game } from './game'
import { Browser } from './browser'
import { Chat } from './chat'
import { Yourlink } from './yourlink'
import { Weather } from './weather'
import { Settings } from './Settings'
import { Manager } from './manager'
import Gallery from './Gallery'


export function Apps() {

    const apps = useSelector((state: STORE_DATA_TYPE) => state.apps)

    return apps && (
        <div className="w-full h-full absolute ">
            {

                apps.map((data: APP_DATA_TYPE) => {
                    console.log(data.name + 'g');
                    if(data.name === AVAILABLE_APPS[0]) return <Manager key={data.id} data={{ ...data, width: 500,fullscreen:false }} />
                    if(data.name === AVAILABLE_APPS[1]) return <Calculator key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[2]) return <Camera key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[3]) return <Game key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[4]) return <Browser key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[5]) return <Chat key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[6]) return <Chat key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[7]) return <Weather key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[8]) return <Yourlink key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[9]) return <Settings key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[10]) return <Gallery key={data.id} data={data} />
                    if(data.name === AVAILABLE_APPS[11]) return <Gallery key={data.id} data={data} />
                    // ['manager', 'calculator', 'alarm', 'game', 'browser']
                })
            }
        </div>
    )

}