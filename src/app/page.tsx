"use client"
import { useRouter } from 'next/navigation';
import { Provider } from "react-redux"
import { store } from "@/data/store"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"
import { Wallpaper, Header, Apps , Widgets ,Shortcuts} from "@/components"
import { gettoken  } from "../../utils/modules"
export default function Home() {
  const router = useRouter();
  const main = useRef(null)
  const token = gettoken('token');
  if(!token) router.push('/Landing');


  useGSAP(() => {

    gsap.from(main.current, {xPercent: -100, opacity: 0, duration: 1})

  }, { scope: main })

  return (
    <Provider store={store}>
      <main ref={main} className="bg-dark relative w-full h-full flex flex-col z-50">
         <Wallpaper /> 
        <Header/>
        <Apps/>
         <Widgets/> 
        <Shortcuts/>
      </main>
    </Provider>
  )

}