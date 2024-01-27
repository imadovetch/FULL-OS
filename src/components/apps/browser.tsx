import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'
import { useState } from "react"

export function Browser({ data }: { data: APP_DATA_TYPE }) {

    const [link, setLink] = useState('')

    return (
        <Window data={data}>
            <div className="browser w-full h-full flex flex-col gap-2 p-2">
                <input
                    className="bg-transparent w-full ring-2 ring-dark-t rounded-md p-1 px-2"
                    onChange={(e) => setLink(e.target.value)}
                />
                <iframe className="bg-light w-full h-full rounded-md" src={link} />
            </div>
        </Window>
    )

}