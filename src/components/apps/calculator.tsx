import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'

export function Calculator({ data }: { data: APP_DATA_TYPE }) {

    return (
        <Window data={data}>
            <div>Hello World</div>
        </Window>
    )

}