import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'

export function Weather({ data }: { data: APP_DATA_TYPE }) {

    return (
        <Window data={data}>
            <div className="p-2 w-full h-full">

                <iframe src="https://weather-app-e5616.web.app/" frameborder="0" width='100%' height='100%'></iframe>
            </div>
            </Window>
    )

}