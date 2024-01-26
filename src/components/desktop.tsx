import { APPS } from '@/data/const'
import { App } from "@/components"

export function Desktop(){
    return (
        <div className="h-full relative">
            <App id={APPS[0].id}/>
        </div>
    )
}