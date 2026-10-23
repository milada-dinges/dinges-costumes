'use client'

import { useState } from "react";
import { NewCostumeForm } from "@/types";
import { CATEGORIES_ARRAY } from "@/types";
import { GENDER_ARRAY } from "@/types";
import { SUBCATEGORIES_ARRAY } from "@/types";
import { SIZE_ARRAY } from "@/types";

export default function Dashboard () {

    const [form, setForm] = useState<NewCostumeForm>({
        title: '',            
        category: '' as any,
        subcategory: '' as any,
        gender: [],
        sizes: [],         
        pricePerDay: 0,    
        imageUrl: '',  
        description: '',
    })

    const [activeDropdown, setActiveDropdown] = useState<'cat' | 'sub' | 'sizes' | 'gender' | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;

        setForm({
            ...form, [id]: id === 'pricePerDay' ?  Number(value) || 0 : value
        })
    }

    const handleToggleArray = (key: 'sizes' | 'gender', item: string) => {
        const currentArray = form[key] as string[];
        const isExsist = currentArray.includes(item);
        
        if(isExsist){
            const cleanArray = currentArray.filter(i => i !== item);
            setForm({...form, [key]: cleanArray})
        } else {
            const newArray = [...currentArray, item]
            setForm({...form, [key]: newArray})
        }
    }
    return(
        <>
            <form>
                <p>Добавление костюма</p>
                <p>* - поле для обязательного заполнения</p>

                <label htmlFor="title">
                    Название костюма*
                    (Образец записи, слеши не пишутся: /Костюм "Цыганка Розы"/)
                </label>
                <input id="title" type="text" value={form.title} onChange={handleChange}/>

                <label htmlFor="pricePerDay">
                    Стоимость аренды посуточная*
                    (Образец записи, слеши не пишутся: /1500/)
                </label>
                <input id="pricePerDay" type="text" value={form.pricePerDay} onChange={handleChange}/>

                <label htmlFor="imageUrl">
                    Фото в пропорции 3/4
                </label>
                <input id="imageUrl" type="file" />

                <label htmlFor="category">
                    Категория*
                </label>
                <div className="dropdown">
                    <button className="dropdown__toggle u-inline-grid" type="button" onClick = {() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}>
                        {form.category ? form.category : 'Не выбрана'}
                    </button>
                    {activeDropdown === 'cat' && (
                        <ul className="dropdown__list" id="category">
                            {CATEGORIES_ARRAY.map((item) => (
                            <li className="dropdown__item" key={item} >
                                <button className='dropdown__btn' 
                                onClick={() => {setForm({...form, category: item}); setActiveDropdown(null)}}>
                                    {item}
                                </button>
                            </li>
                            ))}
                        </ul>
                    )}
                </div>

                <label htmlFor="subcategory">
                    Подкатегория
                </label>
                <div>
                    <button type="button" onClick={() => setActiveDropdown(activeDropdown === 'sub' ? null : 'sub')}>
                        {form.subcategory ? form.subcategory : 'Не выбрана'}
                    </button>
                    {activeDropdown === 'sub' && (
                        <ul id="subcategory">
                            {SUBCATEGORIES_ARRAY.map((item) => (
                            <li key={item} onClick={() => {setForm({...form, subcategory: item}); setActiveDropdown(null)}}>
                                {item}
                            </li>
                            ))}
                        </ul>
                    )}

                </div>
                

                <label htmlFor="sizes">
                    Размер
                    (Если костюм тянется ему можно выбрать нсеколько размеров)
                </label>
                <div id="sizes">
                    <button type="button" onClick={() => setActiveDropdown(activeDropdown === 'sizes' ? null : 'sizes')}>
                        {form.sizes.length !== 0 ? `Выбарно размеров: ${form.sizes.length}` : 'Не выбран'}
                    </button>
                    {activeDropdown === 'sizes' && (
                        <ul>
                            {SIZE_ARRAY.map((item) => (
                            <li key={item} onClick = {() => handleToggleArray('sizes', item)}>
                                {item}
                            </li>
                            ))}
                        </ul>
                    )}
                </div>

                <label htmlFor="gender">
                    Пол
                    (Если унисекс - выберите сразу два пола)
                </label>
                <div id="gender">
                    <button type="button" onClick={() => setActiveDropdown(activeDropdown === 'gender' ? null : 'gender')}>
                        {form.gender.length === 0 && 'Не выбран'}
                        {form.gender.length === 1 && `${form.gender}`}
                        {form.gender.length === 2 && 'Унисекс'}
                    </button>
                    {activeDropdown === 'gender' && (
                        <ul>
                            {GENDER_ARRAY.map((item) => (
                                <li key={item} onClick = {() => handleToggleArray('gender', item)}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <label htmlFor="description">
                    Описание
                </label>
                <input id="description" type="text" onChange = {handleChange}/>
            </form>
            <div></div>
        </>
    )
}