"use client"
// import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/data/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Wallpaper, Header, Apps, Widgets, Shortcuts } from "@/components";
import { gettoken } from "../../utils/modules";

export default function Home() {
  const [authv, setAuthv] = useState<null | boolean>(null);
  const main = useRef(null);

  useEffect(() => {
    const token = gettoken("token");
    if (!token) {
      window.location.href = "/Landing";
    } else {
      setAuthv(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  useGSAP(() => {
    gsap.from(main.current, { xPercent: -100, opacity: 0, duration: 1 });
  }, { scope: main });

  return (
    <Provider store={store}>
      {authv && (
        <main ref={main} className="bg-dark relative w-full h-full flex flex-col z-50">
          <Wallpaper />
          <Header />
          <Apps />
          <Widgets />
          <Shortcuts />
        </main>
      )}
    </Provider>
  );
}
