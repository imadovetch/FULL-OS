import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'

export function Store({ data }: { data: APP_DATA_TYPE }) {

    return (
        <Window data={data}>
            <div className=" w-full h-full">

                <iframe src="https://yomahoot.vercel.app/" frameborder="0" width='100%' height='100%'></iframe>
            </div>
        </Window>
    )

}