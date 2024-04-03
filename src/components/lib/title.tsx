export function Title({ tohover = false, text, side, coler = 'black' }: { tohover?: boolean, text: string, side: 'top' | 'bottom' | 'left' | 'right', coler?: string }) {
    
    switch (side) {
        case 'bottom':
            console.log(text + 'wssal')
            return (
                <div className={`${tohover ? '' : 'opacity-0 hover:opacity-100'} absolute  top-full left-1/4 text-sm font-thin capitalize text-${coler} border-light group-hover:opacity-100 duration-300`}>
                    {text}
                </div>
            );
        default:
            return null;
    }
}
