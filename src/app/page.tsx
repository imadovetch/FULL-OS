"use client"

import { Provider } from "react-redux"
import { store } from "@/data/store"
import { Wallpaper, Header, Apps , Widgets } from "@/components"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

export default function Home() {

  const main = useRef(null)

  useGSAP(() => {

    gsap.from(main.current, {xPercent: -100, opacity: 0, duration: 1})

  }, { scope: main })

  return (
    <Provider store={store}>
      <main ref={main} className="w-full h-full flex flex-col">
        <Wallpaper />
        <Header/>
        <Apps/>
        {/* <Widgets/> */}
      </main>
    </Provider>
  )

}