export function Title({ text, side, coler = 'black' }: { text: string, side: 'top' | 'bottom' | 'left' | 'right', coler?: string }) {
    switch (side) {
        case 'bottom':
            console.log(text + 'wssal')
            return (
                <div className={`absolute top-full left-1/4 text-sm font-thin capitalize text-${coler}     border-light group-hover:opacity-100 duration-300`}>
                    {text}
                </div>
            );
        default:
            return null;
    }
}
