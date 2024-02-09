"use client"

import { Provider } from "react-redux"
import { store } from "@/data/store"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"
import { Wallpaper, Header, Apps , Widgets } from "@/components"

export default function Home() {

  const main = useRef(null)

  useGSAP(() => {

    gsap.from(main.current, {xPercent: -100, opacity: 0, duration: 1})

  }, { scope: main })

  return (
    <Provider store={store}>
      <main ref={main} className="bg-dark relative w-full h-full flex flex-col z-50">
        {/* <Wallpaper /> */}
        <div className="h-full flex justify-center items-center text-6xl">MLIT :(</div>
        <Apps/>
        <Header/>
        {/* <Widgets/> */}
      </main>
    </Provider>
  )

}