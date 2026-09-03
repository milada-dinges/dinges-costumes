type Size = '42' | '44' | '46' | '48' | '50' | '52' | '54' | '56' | '58' | '60' | '62';

type Gender = 'Женский' | 'Мужской';
export type GenderFilter = 'Не выбрано' | Gender;

type Category = 'Карнавальные' | 'Ростовые куклы' | 'Ростовые-наудвные';
export type CategoryFilter = 'Все' | Category;

export interface Costume {
  id: string;               
  title: string;            
  category: Category; 
  subcategory: string;     
  gender: Gender;     
  sizes: Size[];          
  pricePerDay: number;      
  imageUrl: string;         
  description: string;     
}