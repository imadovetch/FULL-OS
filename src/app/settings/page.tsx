"use client"

import { Provider } from "react-redux"
import { store } from "@/data/store"
import { Settings } from "@/components"

export default function Home() {

  return (
    <Provider store={store}>
      
      <Settings/>
      
    </Provider>
  )

}