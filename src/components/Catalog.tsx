'use client'

import { use, useState } from "react";
import Image from "next/image";

import { Costume, SIZE_ARRAY, SizeFilter, CATEGORIES_ARRAY, CategoryFilter, GENDER_ARRAY, GenderFilter, SUBCATEGORIES_ARRAY, SubcategoryFilter } from "@/types/costume";

interface CatalogProps{
    initialCostumes: Costume[];
}

export default function Catalog({ initialCostumes }: CatalogProps) {
    const [costumes] = useState<Costume[]>(initialCostumes);
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Все категории');
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryFilter>('Все подкатегории');
    const [selectedSize, setSelectedSize] = useState<SizeFilter>('Размер');
    const [selectedGender, setSelectedGender] = useState<GenderFilter>('Пол');

    const [activeDropdown, setActiveDropdown] = useState< 'sub' | 'size' | 'gender' | null>(null);

    const categoryBtns = ['Все категории', ...CATEGORIES_ARRAY] as const;
    const subcategoryBtns = ['Все подкатегории', ...SUBCATEGORIES_ARRAY] as const;
    const sizeBtns = ['Размер', ...SIZE_ARRAY] as const;
    const genderBtns = ['Пол', ...GENDER_ARRAY] as const;

    const longSub = subcategoryBtns.reduce((a, b) => a.length > b.length ? a : b);
    const longSize = sizeBtns.reduce((a, b) => a.length > b.length ? a : b);
    const longGender = genderBtns.reduce((a, b) => a.length > b.length ? a : b);

    return (
        <section className="catalog section">

            <h2 className="catalog__h2">Каталог</h2>

            <div className="catalog__filters">
                <div className="filters__category">
                    {categoryBtns.map((btnName) => (
                        <button key={btnName} 
                        className={`category__btn ${selectedCategory === btnName ? 'category__btn__active' : ''}`}
                        onClick={() => setSelectedCategory(btnName)}>
                            {btnName}
                        </button>
                        )) 
                    }
                </div> 

                {selectedCategory === 'Карнавальные' && (
                    <div className="filters__carnaval">
                        <div className="filters__carnaval-dropdown">
                            <div className="carnaval__size dropdown">
                                <button className={`dropdown-toggle u-inline-grid ${selectedSize !== 'Размер' ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'size' ? 'dropdown-toggle__open' : ''}`}
                                onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}>
                                    <span className="dropdown-toggle__text">{selectedSize} <svg className={`arrow-size__close ${selectedSize !== 'Размер' ? 'arrow-size__active' : ''} ${activeDropdown === 'size' ? 'arrow-size__open' : ''}` }  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/> </svg> </span>
                                    <span className="dropdown-toggle__ghost">{longGender} <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="#754F9B"/></svg> </span>
                                </button>
                                {activeDropdown === 'size' && (
                                    <ul className="dropdown__list">
                                        {sizeBtns.map((liName) => (
                                            <li key={liName} className="dropdown__item">
                                            <button className='dropdown__btn' 
                                            onClick={() => {setSelectedSize(liName); setActiveDropdown(null);}}>
                                                {liName}
                                            </button>
                                            </li>))
                                        }
                                    </ul>)
                                }
                            </div>  

                            <div className="carnaval__gender dropdown">
                                <button className={`dropdown-toggle u-inline-grid ${selectedGender !== 'Пол' ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'gender' ? 'dropdown-toggle__open' : ''}`}
                                onClick={() => setActiveDropdown(activeDropdown === 'gender' ? null : 'gender')}>
                                    <span className="dropdown-toggle__text">{selectedGender} <svg className={`arrow-gender__close ${selectedGender !== 'Пол' ? 'arrow-gender__active' : ''} ${activeDropdown === 'gender' ? 'arrow-gender__open' : ''}` }  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/> </svg> </span>
                                    <span className="dropdown-toggle__ghost">{longGender} <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="#754F9B"/></svg> </span>
                                </button>
                                {activeDropdown === 'gender' && (
                                    <ul className="dropdown__list">
                                        {genderBtns.map((liName) => (
                                            <li key={liName} className="dropdown__item">
                                            <button className='dropdown__btn' 
                                            onClick={() => {setSelectedGender(liName); setActiveDropdown(null);}}>
                                                {liName}
                                            </button>
                                            </li>))
                                        }
                                    </ul>)
                                }
                            </div>                       
                            
                            <div className="carnaval__sub dropdown">
                                <button className={`dropdown-toggle u-inline-grid ${selectedSubcategory !== 'Все подкатегории' ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'sub' ? 'dropdown-toggle__open' : ''}`}
                                onClick={() => setActiveDropdown(activeDropdown === 'sub' ? null : 'sub')}>
                                    <span className="dropdown-toggle__text">{selectedSubcategory} <svg className={`arrow-sub__close ${selectedSubcategory !== 'Все подкатегории' ? 'arrow-sub__active' : ''} ${activeDropdown === 'sub' ? 'arrow-sub__open' : ''}` }  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/> </svg> </span>
                                    <span className="dropdown-toggle__ghost">{longSub} <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="#754F9B"/></svg> </span>
                                </button>
                                {activeDropdown === 'sub' && (
                                    <ul className="dropdown__list">
                                        {subcategoryBtns.map((liName) => (
                                            <li key={liName} className="dropdown__item">
                                            <button className='dropdown__btn' 
                                            onClick={() => {setSelectedSubcategory(liName); setActiveDropdown(null);}}>
                                                {liName}
                                            </button>
                                            </li>))
                                        }
                                    </ul>)
                                }
                            </div>
                        </div>

                        
                        <div className="carnaval__sub-pc">
                        {subcategoryBtns.map((btnName) => (
                            <button key={btnName}
                            className={`sub-pc__btn ${selectedSubcategory === btnName ? 'sub-pc__btn__active' : ''}`}
                            onClick={() => setSelectedSubcategory(btnName)}>
                                {btnName}
                            </button>))
                        }
                        </div>

                        
                        
                    </div>)
                }
            </div>
            <div className="catalog__grid">
                {costumes.map((card) => (
                    <div key={card.id} className="grid__card">
                        <div className="card__img-container">
                            <Image className="card__img" src={card.imageUrl} alt={card.title} fill sizes="(max-width: 768px) 100 vw, (max-width:1200px) 50vw, 25vw"></Image>
                        </div>

                        <div className="card__text-group">
                            <h3 className="card__ttl">
                                Костюм "{card.title}"
                            </h3>

                            <p className="card__size">
                                {card.sizes && card.sizes.length > 0 && (
                                    <>
                                        Размеры: <span className="bold">{card.sizes[0]}</span>
                                        {card.sizes[1] && `, ${card.sizes[1]}`}
                                        {card.sizes[2] && `, ${card.sizes[2]}`}
                                    </>
                                )}
                            </p>

                            <p className="card__price"> 
                                <span className="card__price-numder">{card.pricePerDay}</span>
                                <span>₽/сутки</span>
                            </p>
                        </div>

                        <div className="card__btns">
                            <button className="card__reservation">
                                Бронь на <Image src='' alt=''></Image>
                            </button>
                            <button className="card__more">
                                <Image src='' alt=''></Image>
                            </button>
                        </div>
                    </div>
                ))
            }
            </div>
        </section>
    );
}