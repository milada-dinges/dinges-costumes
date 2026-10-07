'use client';

import { useState } from "react";
import Image from "next/image";

import { Costume, SIZE_ARRAY, SizeFilter, CATEGORIES_ARRAY, CategoryFilter, GENDER_ARRAY, GenderFilter, SUBCATEGORIES_ARRAY, SubcategoryFilter } from "@/types";

import { useCartStore } from "@/source/useCartStore";

interface CatalogProps{
    initialCostumes: Costume[];
}

export const Catalog = ({ initialCostumes }: CatalogProps) => {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

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
    
    function handleCategoryChange(category: CategoryFilter) {
        setSelectedCategory(category);
        setSelectedSubcategory('Все подкатегории'); 
        setSelectedGender('Пол');
        setSelectedSize('Размер')
    }
    

    const filteredCatalog = costumes.filter((card) => {
        const matchesCategory = selectedCategory === 'Все категории' || card.category === selectedCategory;
        const matchesSize = selectedCategory !== 'Карнавальные' || selectedSize === 'Размер' || (card.sizes?.includes(selectedSize) ?? false);
        const matchesGender = selectedCategory !== 'Карнавальные' || selectedGender === 'Пол' || (card.gender?.includes(selectedGender) ?? false);
        const matchesSub = selectedCategory !== 'Карнавальные' || selectedSubcategory === 'Все подкатегории' || card.subcategory === selectedSubcategory;

        console.log('selectedSize:', JSON.stringify(selectedSize));
        console.log('card.sizes:', JSON.stringify(card.sizes));

        return matchesCategory && matchesSize && matchesGender && matchesSub}
    )



    return (
        <section className="catalog" id="catalog">

            <div className="catalog__filters">
                <h2 className="catalog__ttl">Каталог</h2>

                <div className="filters__category">
                    {categoryBtns.map((btnName) => (
                        <button key={btnName} 
                        className={`category__btn ${selectedCategory === btnName ? 'category__btn__active' : ''}`}
                        onClick={() => handleCategoryChange(btnName)}>
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
                                    <span className="dropdown-toggle__ghost">{longSize} <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="#754F9B"/></svg> </span>
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
                {filteredCatalog.map((card) => {
                    const isItemInCart = cart.some((item) => item.id === card.id);

                    return (
                    <div key={card.id} className="grid__card">
                        <div className="card__top">
                            <div className="card__img-container">
                                <Image className="card__img" src={card.imageUrl} alt={card.title} fill sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 25vw"></Image>
                            </div>

                            <p className="card__price"> 
                                Аренда за сутки: <span className="bold">{card.pricePerDay}</span>₽
                            </p>

                            <div className="card__text-group">
                                <h3>
                                    {card.title}
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
                            </div>
                        </div>

                        <button className="card__btn" onClick={() => isItemInCart ? removeFromCart(card.id) : addToCart(card)}>
                            {isItemInCart ? <span>Удалить из</span> : <span>Добавить в</span>}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 2H4.17L3.99 0.85C3.91 0.36 3.49 0 3 0H0V2H2.14L4.01 14.15C4.09 14.64 4.51 15 5 15H17V13H5.86L5.55 11H17C17.45 11 17.84 10.7 17.96 10.27L19.96 3.27C20.0043 3.12105 20.0128 2.96378 19.985 2.8109C19.9572 2.65802 19.8939 2.51383 19.8 2.39C19.61 2.14 19.31 1.99 19 1.99V2ZM6 16C5.46957 16 4.96086 16.2107 4.58579 16.5858C4.21071 16.9609 4 17.4696 4 18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18C8 17.4696 7.78929 16.9609 7.41421 16.5858C7.03914 16.2107 6.53043 16 6 16ZM15 16C14.4696 16 13.9609 16.2107 13.5858 16.5858C13.2107 16.9609 13 17.4696 13 18C13 18.5304 13.2107 19.0391 13.5858 19.4142C13.9609 19.7893 14.4696 20 15 20C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18C17 17.4696 16.7893 16.9609 16.4142 16.5858C16.0391 16.2107 15.5304 16 15 16Z" fill="white"/>
                            </svg>

                        </button>

                    </div>)})
                }
            </div>
        </section>
    );
}