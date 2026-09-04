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

    return (
        <section className="catalog">
            <div className="catalog__filters">
                <div className="filters__category">
                    {categoryBtns.map((btnName) => (
                        <button key={btnName} 
                        className={`filters__category-btn ${selectedCategory === btnName ? 'category-btn__active' : ''}`}
                        onClick={() => setSelectedCategory(btnName)}>
                            {btnName}
                        </button>
                        ))
                    }
                </div>
            </div> 
            {selectedCategory === 'Карнавальные' && (
                <div className="filters__carnaval">
                    <div className="carnaval__sub-pc">
                    {subcategoryBtns.map((btnName) => (
                        <button key={btnName}
                        className={`sub-btn ${selectedSubcategory === btnName ? 'sub-btn__active' : ''}`}
                        onClick={() => setSelectedSubcategory(btnName)}>
                            {btnName}
                        </button>
                        ))
                    }
                    </div>
                    
                /////////////////////////выпадающие списки///////////////////////////////////////////////////////////////////////
                    <div className="carnaval-sub">
                        <button className={`dropdown-toggle ${selectedSubcategory !== 'Все подкатегории' ? 'dropdown-toggle__active' : ''}`}
                        onClick={() => setActiveDropdown(activeDropdown === 'sub' ? null : 'sub')}>
                            {selectedSubcategory}
                        </button>
                    {activeDropdown === 'sub' && (
                        <ul className="carnaval-sub__dropdown">
                            {subcategoryBtns.map((liName) => (
                                <li key={liName} className="dropdown__li">
                                <button className='dropdown__btn' 
                                onClick={() => {setSelectedSubcategory(liName); setActiveDropdown(null);}}>
                                    {liName}
                                </button>
                                </li>
                            ))}
                        </ul>
                        )}

                    </div>

                    <div className="carnaval__size">
                    {sizeBtns.map((liName) => (
                        <button key={liName}
                        className={`dropdown-btn ${selectedSize === liName ? 'dropdown__active' : ''}`}
                        onClick={() => setSelectedSize(liName)}>
                            {liName}
                        </button>
                        ))
                    }
                    </div>

                    <div className="carnaval__gender">
                    {genderBtns.map((liName) => (
                        <button key={liName}
                        className={`dropdown-btn ${selectedGender === liName ? 'dropdown__active' : ''}`}
                        onClick={() => setSelectedGender(liName)}>
                            {liName}
                        </button>
                        ))
                    }
                    </div>
                </div>
                )
            }
        </section>
    );
}