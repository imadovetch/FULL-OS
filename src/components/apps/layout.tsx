import { I } from "@/components"

export default function Layout({
    title,
    children,
}: Readonly<{
    title: string,
    children: React.ReactNode
}>) {
    return (
        <div className="bg-shadow-dark w-1/2 h-1/2 absolute top-10 left-10 rounded-md shadow-md overflow-hidden">
            
            <div className="bg-shadow-dark flex items-center justify-between">

                <span className="font-bold px-2">{title}</span>

                <div className="flex">
                    <button className="btn-simple">
                        <I type="minimize" />
                    </button>
                    <button className="btn-simple">
                        <I type="maximize" />
                    </button>
                    <button className="btn-simple">
                        <I type="close" />
                    </button>
                </div>

            </div>

            {children}

        </div>
    )
}
