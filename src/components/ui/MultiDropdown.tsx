interface MultiDropdownProps<T extends string> {
    options: readonly T[];
    selected: readonly T[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (option: T) => void;
    emptyText: string;
    countText: string;
    className?: string;
    id?: string;
}

export function MultiDropdown<T extends string>
({options, selected, isOpen, onToggle, onSelect, emptyText, countText, className = '', id}: MultiDropdownProps<T>){
    const text = selected.length > 0 ? `${countText} ${selected.length}` : `${emptyText}`;

    const longest = [emptyText, `${countText} ${options.length}`].reduce((a, b) => a.length > b.length ? a : b);

    return(
        <div className={`${className} dropdown`}>
            <button id={id} type='button' className={`${className} dropdown__toggle u-inline-grid ${isOpen ? 'dropdown-toggle__open' : ''}`} onClick={onToggle}>
                <span className="dropdown-toggle__text">{text}</span>
                <span className="dropdown-toggle__ghost">{longest}</span>
            </button>
            {isOpen && (
                <ul className="dropdown__list">
                    {options.map((option) => (
                    <li className="dropdown__item" key={option}>
                        <button type='button' className='dropdown__btn' 
                        onClick = {() => onSelect(option)}>
                            {option}
                        </button>
                    </li>))
                }
                </ul>)
            }
        </div>
    )
}