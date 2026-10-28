'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/services/supabase"

import { getCostumes } from '@/services/costumes'

import { Costume } from "@/types";
import { CATEGORIES_ARRAY } from "@/types";
import { GENDER_ARRAY } from "@/types";
import { SUBCATEGORIES_ARRAY } from "@/types";
import { SIZE_ARRAY } from "@/types";


export default function Dashboard () {
    const [costumes, setCostumes ] = useState<Costume[]>([]);

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const [activeDropdown, setActiveDropdown] = useState<'cat' | 'sub' | 'sizes' | 'gender' | null>(null)
    const [imgFile, setImgFile] = useState<File | null>(null);

    const [form, setForm] = useState<Costume>({
        title: '',            
        category: '' as any,
        subcategory: '' as any,
        gender: [],
        sizes: [],         
        pricePerDay: 0,    
        imageUrl: '',  
        description: '',
    })

    const fethData = async () => {
        const data = await getCostumes();
        console.log("СМОТРИ! ИЗ БАЗЫ ПРИЛЕТЕЛО ЭТО:", data);
        setCostumes(data);
    }

    const handleDelete = async (id: string, imageUrl: string) => {
        const isConfirm = confirm('Вы уверены что хотите УДАЛИТЬ костюм?')
        if(!isConfirm) {
            return
        }

        try {
            setLoading(true);

            const { error: bdError } = await supabase
            .from('costumes')
            .delete()
            .eq('id', id);

            if(bdError) {
                alert(`Ошибка удаления картинки: ${bdError.message}`);
                setLoading(false);
                return
            }

            const imgName = imageUrl.split('/').pop();

            if(imgName) {
                const { error: imgError } = await supabase
                .storage
                .from('costumes')
                .remove([imgName]);

                if(imgError){
                    alert(`Картинка не удалилась с облака: ${imgError.message}`);
                    setLoading(false);
                    return
                }
            }


        }catch(err) {
            console.error(err);
            alert(`Критическая ошибка удаления картинки`);
            setLoading(false);
            return
        }

        alert('Успешное удаление костюма и его картинки из базы данных!')
        setLoading(false);

        await fethData();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setImgFile(e.target.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(form.category === 'Карнавальные'){
            if(
                !form.title.trim() ||
                !imgFile ||
                form.pricePerDay <= 0 ||
                form.gender.length === 0 ||
                form.sizes.length === 0 ||
                !form.subcategory
            ) {
                alert('Заполните все обязательыне поля для карнавальных(под * и **)')
                return
            }
        } else {
            if (
                    !form.title.trim() ||
                    !form.category ||
                    !imgFile ||
                    form.pricePerDay <= 0
                ) {
                    alert('Заполните все обязательыне поля(под *)')
                    return
            }
        }

        try{
            setLoading(true)

            const fileExtention = imgFile.name.split('.').pop();
            const uniqueFileName = `${Date.now()}.${fileExtention}`;

            const { data: storageData, error: storageError } = await supabase
            .storage
            .from('costumes')
            .upload(uniqueFileName, imgFile);

            if(storageError) {
                alert(`Ошибка хранилища изображений: ${storageError.message}`)
                setLoading(false)
                return
            }

            const { data: urlData } = supabase
            .storage
            .from('costumes')
            .getPublicUrl(uniqueFileName);

            const finalPublicUrl = urlData.publicUrl;

            const { error: dbError} = await supabase
            .from('costumes')
            .insert({
                title: form.title,            
                category: form.category,
                subcategory: form.category === 'Карнавальные' ? form.subcategory : null,   
                gender: form.category === 'Карнавальные' ? form.gender : [],
                sizes: form.category === 'Карнавальные' ? form.sizes : [],          
                pricePerDay: form.pricePerDay,     
                imageUrl: finalPublicUrl,
                description: form.description,
            })

            if(dbError) {
                alert(`Ошибка быза данных: ${dbError.message}`)
                setLoading(false)
                return
            }

            alert('Костюм добавлен в базу дынных успешно!')

            setForm({
                title: '',            
                category: '' as any,
                subcategory: '' as any,
                gender: [],
                sizes: [],         
                pricePerDay: 0,    
                imageUrl: '',  
                description: '',               
            })
            setImgFile(null);
            setLoading(false);
        } catch(err) {
            console.error(err)
            alert('Критическая ошибка сети!')
            setLoading(false)
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            const { data: {session} } = await supabase.auth.getSession();
            if (!session){
                router.push('/admin');
            }else {
                setLoading(false)
            }
        }   

        checkAuth()
    }, [router])

    useEffect(() => {
        if(!loading) {
            fethData();
        }
    }, [loading])

    if(loading) {
        return(
            <div>
                Ожидайте...
            </div>
        )
    }

    return(
        <div className="dashboard">
            <div className="container"> 
                <form className="add-form" onSubmit={handleSubmit}>
                    <h2 className="dashboard__h2">Добавление костюма</h2>
                    <p className="add-form__desc">* - поле для обязательного заполнения для всех костюмов</p>
                    <p className="add-form__desc">** - поле для обязательного заполнения для карнавальных костюмов</p>

                    <label htmlFor="title">
                        Название костюма*<br />
                        <span>(Образец записи, слеши не пишутся: /Костюм "Цыганка Розы"/)</span>
                    </label>
                    <input className="admin__input" id="title" type="text" value={form.title} onChange={handleChange}/>

                    <label htmlFor="pricePerDay">
                        Стоимость аренды посуточная*<br />
                        <span>(Образец записи, слеши не пишутся: /1500/)</span>
                    </label>
                    <input className="admin__input" id="pricePerDay" type="text" value={form.pricePerDay} onChange={handleChange}/>

                    <label htmlFor="imageUrl">
                        Фото в пропорции 3/4*
                    </label>
                    <input className="add-form__input-file" id="imageUrl" type="file" onChange={handleFileChange}/>

                    <label htmlFor="category">
                        Категория*
                    </label>
                    <div className="dropdown">
                        <button className={`add-btn dropdown__toggle u-inline-grid ${form.category !== '' as any ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'cat' ? 'dropdown-toggle__open' : ''}`} type="button" onClick = {() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}>
                            <span className="dropdown-toggle__text">{form.category ? form.category : 'Не выбрана'}</span>
                            <span className="dropdown-toggle__ghost">{CATEGORIES_ARRAY.reduce((a, b) => a.length > b.length ? a : b)}</span>
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
                        Подкатегория**
                    </label>
                    <div className="dropdown">
                        <button className={`add-btn dropdown__toggle u-inline-grid ${form.category !== '' as any ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'sub' ? 'dropdown-toggle__open' : ''}`} type="button" onClick={() => setActiveDropdown(activeDropdown === 'sub' ? null : 'sub')}>
                            <span className="dropdown-toggle__text">{form.subcategory ? form.subcategory : 'Не выбрана'}</span>
                            <span className="dropdown-toggle__ghost">{SUBCATEGORIES_ARRAY.reduce((a, b) => a.length > b.length ? a : b)}</span>
                        </button>
                        {activeDropdown === 'sub' && (
                            <ul className="dropdown__list" id="subcategory">
                                {SUBCATEGORIES_ARRAY.map((item) => (
                                <li className="dropdown__item" key={item} onClick={() => {setForm({...form, subcategory: item}); setActiveDropdown(null)}}>
                                    <button className='dropdown__btn' 
                                    onClick={() => {setForm({...form, subcategory: item}); setActiveDropdown(null)}}>
                                        {item}
                                    </button>
                                </li>
                                ))}
                            </ul>
                        )}

                    </div>
                    

                    <label htmlFor="sizes">
                        Размер**
                        (Если костюм тянется ему можно выбрать нсеколько размеров)
                    </label>
                    <div className="dropdown" id="sizes">
                        <button className={`add-btn dropdown__toggle u-inline-grid ${form.category !== '' as any ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'sizes' ? 'dropdown-toggle__open' : ''}`} type="button" onClick={() => setActiveDropdown(activeDropdown === 'sizes' ? null : 'sizes')}>
                            <span className="dropdown-toggle__text">{form.sizes.length !== 0 ? `Выбарно размеров: ${form.sizes.length}` : 'Не выбран'}</span>
                            <span className="dropdown-toggle__ghost">{SIZE_ARRAY.reduce((a, b) => a.length > b.length ? a : b)}</span>
                        </button>
                        {activeDropdown === 'sizes' && (
                            <ul className="dropdown__list">
                                {SIZE_ARRAY.map((item) => (
                                <li className="dropdown__item" key={item}>
                                    <button className='dropdown__btn' 
                                    onClick = {() => handleToggleArray('sizes', item)}>
                                        {item}
                                    </button>
                                </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <label htmlFor="gender">
                        Пол**
                        (Если унисекс - выберите сразу два пола)
                    </label>
                    <div className="dropdown" id="gender">
                        <button className={`add-btn dropdown__toggle u-inline-grid ${form.category !== '' as any ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'gender' ? 'dropdown-toggle__open' : ''}`} type="button" onClick={() => setActiveDropdown(activeDropdown === 'gender' ? null : 'gender')}>
                            <span className="dropdown-toggle__text">
                                {form.gender.length === 0 && 'Не выбран'}
                                {form.gender.length === 1 && `${form.gender}`}
                                {form.gender.length === 2 && 'Унисекс'}
                            </span>
                            <span className="dropdown-toggle__ghost">{GENDER_ARRAY.reduce((a, b) => a.length > b.length ? a : b)}</span>
                        </button>
                        {activeDropdown === 'gender' && (
                            <ul className="dropdown__list">
                                {GENDER_ARRAY.map((item) => (
                                    <li className="dropdown__item" key={item}>
                                        <button className='dropdown__btn' 
                                        onClick = {() => handleToggleArray('gender', item)}>
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <label htmlFor="description">
                        Описание
                    </label>
                    <textarea className="add-form__textarea" id="description" onChange = {handleChange}/>

                    <button className="admin__btn" type="submit">Отправить</button>
                </form>
            </div>
            
            <div className="container">
                <h2 className="dashboard__h2">
                    Все костюмы и удаление
                </h2>
                <table className="delete-table">
                    <thead className="delete-table__top">
                        <tr>
                            <th>Фото</th>
                            <th>Название</th>
                            <th>Категория</th>
                            <th>₽/сутки</th>
                            <th>Подкатегория</th>
                            <th>Размер(ы)</th>
                            <th>Пол</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="delete-table__tbody">
                        {costumes.map((item) => (
                                <tr className="tbody__costume" key={item.id}>
                                    <td className="tbody__td-img">
                                        <img src={item.imageUrl}/>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.pricePerDay}</td>
                                    <td>{item.subcategory || '-'}</td>
                                    <td>{item.sizes && item.sizes.length > 0 ? item.sizes.join(', ') : '-'}</td>
                                    <td>{item.gender &&item.gender.length > 0 ? item.gender.join(', ') : '-'}</td>
                                    <td>
                                        <button className="admin__btn" onClick={() => handleDelete(item.id!, item.imageUrl)}>
                                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.9859 2H8.5V0.5C8.5 0.367392 8.44732 0.240215 8.35355 0.146447C8.25979 0.0526784 8.13261 0 8 0H4C3.86739 0 3.74021 0.0526784 3.64645 0.146447C3.55268 0.240215 3.5 0.367392 3.5 0.5V2H0.0140624L0 3.25H1.03125L1.65906 13.0625C1.67495 13.3163 1.7869 13.5544 1.97214 13.7286C2.15738 13.9027 2.402 13.9998 2.65625 14H9.34375C9.59785 14 9.84241 13.9032 10.0277 13.7294C10.2131 13.5555 10.3253 13.3176 10.3416 13.0641L10.9688 3.25H12L11.9859 2ZM3.5 12L3.21875 4H4.25L4.53125 12H3.5ZM6.5 12H5.5V4H6.5V12ZM7.25 2H4.75V1.125C4.75 1.09185 4.76317 1.06005 4.78661 1.03661C4.81005 1.01317 4.84185 1 4.875 1H7.125C7.15815 1 7.18995 1.01317 7.21339 1.03661C7.23683 1.06005 7.25 1.09185 7.25 1.125V2ZM8.5 12H7.46875L7.75 4H8.78125L8.5 12Z" fill="var(--primary)"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
 
        </div>
    )
}