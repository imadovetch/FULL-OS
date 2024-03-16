'use client'


import { default as TimeWidget } from './time'
import { default as WeatherWidgetPage } from './weatherwidget'



export function Widgets() {
    return  (
        <div className=" border m-auto h-64 w-3/5 flex justify-between items-center">
  <TimeWidget />
  <WeatherWidgetPage />
        
</div>

    )
}