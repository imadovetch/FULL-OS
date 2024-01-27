"use client"

import { Wallpaper, Header, Apps } from "@/components"
import { Provider } from "react-redux"
import { store } from "@/data/store"

export default function Home() {

  return (
    <Provider store={store}>
      <main className="w-full h-full flex flex-col">
        <Wallpaper />
        <Header/>
        <Apps/>
      </main>
    </Provider>
  )

}