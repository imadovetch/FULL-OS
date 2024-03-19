'use client'


import { default as TimeWidget } from './time'
import { default as WeatherWidgetPage } from './weatherwidget'



export function Widgets() {
    return  (
        <div className=" border m-auto h-80 w-4/5 flex px-32 justify-between items-center">
  <TimeWidget />
  <WeatherWidgetPage />
        
</div>

    )
}