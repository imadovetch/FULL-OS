export function Calculator(){

    const KEYS = [
        {
            name: '7',
        },
        {
            name: '8',
        },
        {
            name: '9',
        },
        {
            name: 'x',
        },
        {
            name: '4',
        },
        {
            name: '5',
        },
        {
            name: '6',
        },
        {
            name: '-',
        },
        {
            name: '1',
        },
        {
            name: '2',
        },
        {
            name: '3',
        },
        {
            name: '+',
        },
        {
            name: ' ',
        },
        {
            name: '0',
        },
        {
            name: '.',
        },
        {
            name: '=',
        }
    ]

    return (
        <div className="bg-dark w-full h-full see">
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
        </div>
    )
}