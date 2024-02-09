'use client'

import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'

export function Calculator({ data }: { data: APP_DATA_TYPE }) {

    const KEYS_LIST = [
        '7',
        '8',
        '9',
        '+',
        '4',
        '5',
        '6',
        '-',
        '1',
        '2',
        '3',
        'x',
        'DEL',
        '0',
        '.',
        '=',
    ]

    return (
        <Window data={data}>
            <div className="w-full h-full flex flex-col gap-2 p-2">
                <div className="bg-dark-t p-2 rounded-md min-h-[100px] h-full">Result</div>
                <div className="grid grid-cols-4 gap-2">
                    {KEYS_LIST.map(key => <button className="btn-dark">{key}</button>)}
                </div>
            </div>
        </Window>
    )

}