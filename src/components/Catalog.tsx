'use client'

import { use, useState } from "react";

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
            <div className="catalog__filters-group">

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
                </div> 





                {selectedCategory === 'Карнавальные' && (

                    <div className="filters__carnaval">
                        <div className="carnaval__size">
                        {sizeBtns.map((liName) => (
                            <button key={liName}
                            className={`dropdown-toggle ${selectedSize === liName ? 'dropdown-toggle__active' : ''}`}
                            onClick={() => setSelectedSize(liName)}>
                                {liName}
                            </button>))
                        }
                        </div>

                        
                        <div className="carnaval__gender">
                        {genderBtns.map((liName) => (
                            <button key={liName}
                            className={`dropdown ${selectedGender === liName ? 'dropdown__active' : ''}`}
                            onClick={() => setSelectedGender(liName)}>
                                {liName}
                            </button>))
                        }
                        </div>
                        
                        
                        <div className="carnaval__sub dropdown">
                            <button className={`dropdown-toggle u-inline-grid ${selectedSubcategory !== 'Все подкатегории' ? 'dropdown-toggle__active' : ''} ${activeDropdown === 'sub' ? 'dropdown-toggle__open' : ''}`}
                            onClick={() => setActiveDropdown(activeDropdown === 'sub' ? null : 'sub')}>
                                <span className="dropdown-toggle__text">{selectedSubcategory}</span>
                                <span className="dropdown-toggle__ghost">{longSub}</span>
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
            
        </section>
    );
}