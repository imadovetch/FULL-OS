'use client'


import { default as TimeWidget } from './time'
import { default as WeatherWidgetPage } from './weatherwidget'



export function Widgets() {
    return  (
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto h-64 w-2/5 flex justify-between items-center">
  <TimeWidget />
  <WeatherWidgetPage />
</div>

    )
}