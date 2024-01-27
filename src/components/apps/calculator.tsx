import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'

export function Calculator({ data }: { data: APP_DATA_TYPE }) {

    return (
        <Window data={data}>
            <></>
        </Window>
    )

}

{/* <div className="bg-dark w-full h-full see">
<div className="h-[100px] bg-dark-t"></div>
<div className="grid grid-cols-4 gap-2 p-2">
    {
        KEYS.map(key => {
            return (
                <button className="btn-dark">
                    <span className="text-4xl font-black">{key.name}</span>
                </button>
            )
        })
    }
</div>
</div> */}