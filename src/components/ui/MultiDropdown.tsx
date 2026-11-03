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

    return(
        <div className={`${className} dropdown`}>
            <button id={id} type='button' className={`dropdown__toggle u-inline-grid ${isOpen ? 'dropdown__toggle__open' : ''}`} onClick={onToggle}>
                <span className="toggle__text">{text} <svg className={`arrow ${isOpen ? 'arrow__open' : ''}`}  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
                <span className="toggle__ghost">{emptyText} <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
                <span className="toggle__ghost">{countText} {options.length} <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
            </button>
            {isOpen && (
                <ul className="dropdown__list">
                    {options.map((option) => (
                    <li className="dropdown__item" key={option}>
                        <label className='dropdown__btn dropdown__checkbox'>
                            <input type="checkbox" 
                            checked={selected.includes(option)}
                            onChange = {() => onSelect(option)}/>
                            {option}
                        </label>
                    </li>))
                }
                </ul>)
            }
        </div>
    )
}