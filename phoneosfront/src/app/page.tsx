"use client"
import Link from "next/link"
import {Wallpaper, Header, Desktop } from "@/components"

export default function Home() {

  return (
    <main className="main">
      {/* <Wallpaper/> */}
      <Header/>
      <Desktop/>
    </main>
  )

}