interface DropdownProps<T extends string> {
    options: readonly T[];
    value: T;
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (option: T) => void;
    className?: string;
}

export function DropDown<T extends string>({options, value, isOpen, onToggle, onSelect, className = ''}
: DropdownProps<T>) {
    const longest = options.reduce((a, b) => (a.length > b.length ? a : b));

    return(
        <div className={`${className} dropdown`}>
            <button type='button' className={`dropdown-toggle u-inline-grid ${isOpen ? 'dropdown-toggle__open' : ''}`}
            onClick={onToggle}>
                <span className="dropdown-toggle__text">{value} <svg className={`arrow ${isOpen ? 'arrow__open' : ''}`}  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg> </span>
                <span className="dropdown-toggle__ghost">{longest} <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="#754F9B"/></svg> </span>
            </button>
            {isOpen && (
                <ul className="dropdown__list">
                    {options.map((option) => (
                        <li key={option} className="dropdown__item">
                        <button className='dropdown__btn' 
                        onClick={() => onSelect(option)}>
                            {option}
                        </button>
                        </li>))
                    }
                </ul>)
            }
        </div>
    )
}