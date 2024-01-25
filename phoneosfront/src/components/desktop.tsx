import { APPS, APP_TYPE } from "@/data/const"

export function Desktop(){
    return (
        <div className="h-full flex gap-4 p-4">
            {APPS.map(app => <App app={app}/>)}
        </div>
    )
}

function App({app}:{app:APP_TYPE}){

    return (
        <div className="relative flex items-center justify-center w-[50px] h-[50px] bg-dark-t rounded-md">
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full">{app.name}</span>
        </div>
    )

}