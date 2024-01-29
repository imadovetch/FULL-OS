"use client"

import { Provider } from "react-redux"
import { store } from "@/data/store"
import { Wallpaper, Header, Apps , Widgets } from "@/components"

export default function Home() {

  return (
    <Provider store={store}>
      <main className="w-full h-full flex flex-col">
        <Wallpaper />
        <Header/>
        <Apps/>
        {/* <Widgets/> */}
      </main>
    </Provider>
  )

}