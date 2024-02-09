export function Title({text, side}: {text: string, side: 'top' | 'bottom' | 'left' | 'right'}) {
    switch(side) {
        case 'top': return (
            <div className="absolute -top-1 -translate-y-full left-1/2 -translate-x-1/2 text-xs capitalize bg-dark-t border border-light p-1 group-hover:opacity-100 opacity-0 duration-300">
                {text}
            </div>
        )
    }
}