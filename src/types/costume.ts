
export const SIZE_ARRAY = ['42', '44', '46', '48', '50', '52', '54', '56', '58', '60', '62'] as const;
type Size = typeof SIZE_ARRAY[number];
export type SizeFilter = 'Размер' | Size;


export const GENDER_ARRAY = ['Женский', 'Мужской'] as const;
type Gender = typeof GENDER_ARRAY[number];
export type GenderFilter = 'Пол' | Gender;

export const CATEGORIES_ARRAY = ['Карнавальные', 'Ростовые куклы', 'Ростовые-наудвные'] as const;
type Category = typeof CATEGORIES_ARRAY[number];
export type CategoryFilter = 'Все категории' | Category;

export const SUBCATEGORIES_ARRAY = ['Народные', 'Сказка', 'Герои',  'Злодеи', 'Воин', 'Хеллоуин', 'Готика', 'Веселье', 'Приключения', '80-е и 90-е', 'Диско', 'Великий Гэтсби', 'Новый год', 'Исторические', 'Вечерние' , 'Прочее'] as const;
type Subcategory = typeof SUBCATEGORIES_ARRAY[number];
export type SubcategoryFilter = 'Все подкатегории' | Subcategory;


export interface Costume {
  id: string;               
  title: string;            
  category: Category; 
  subcategory?: Subcategory;     
  gender?: Gender[];     
  sizes?: Size[];          
  pricePerDay: number;      
  imageUrl: string;         
  description?: string;     
}