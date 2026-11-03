
export const SIZE_ARRAY = ['42', '44', '46', '48', '50', '52', '54', '56', '58', '60', '62'] as const;
export type Size = typeof SIZE_ARRAY[number];
export type SizeFilter = 'Размер' | Size;

export const GENDER_ARRAY = ['Женский', 'Мужской'] as const;
export type Gender = typeof GENDER_ARRAY[number];
export type GenderFilter = 'Пол' | Gender;

export const CATEGORIES_ARRAY = ['Карнавальные', 'Ростовые куклы', 'Ростовые-надувные'] as const;
export type Category = typeof CATEGORIES_ARRAY[number];
export type CategoryFilter = 'Все категории' | Category;

export const SUBCATEGORIES_ARRAY = ['Народные', '80-е и 90-е', 'Диско', 'Великий Гэтсби', 'Герои', 'Злодеи', 'Исторические', 'Приключения', 'Хеллоуин', 'Новый год', 'Вечерние', 'Прочее'] as const;
export type Subcategory = typeof SUBCATEGORIES_ARRAY[number];
export type SubcategoryFilter = 'Все подкатегории' | Subcategory;

export const TIME_ARRAY = ['Не выбрано','с 9 до 10','с 10 до 11','с 18 до 19','с 19 до 20'] as const;
export const DURATION_ARRAY = ['Не выбрано','1 сутки','2 суток','3 суток','4 суток','5 суток'] as const;
export type Time = typeof TIME_ARRAY[number];
export type Duration = typeof DURATION_ARRAY[number];

export const CATEGORIES_ARRAY_ADMIN = ['Не выбрана', ...CATEGORIES_ARRAY] as const;
export const SUBCATEGORIES_ARRAY_ADMIN = ['Не выбрана', ...SUBCATEGORIES_ARRAY] as const;
export type CategoryFilterAdmin = typeof CATEGORIES_ARRAY_ADMIN[number];
export type SubcategoryFilterAdmin = typeof SUBCATEGORIES_ARRAY_ADMIN[number];


export interface Costume {
  id?: string;               
  title: string;            
  category: Category; 
  subcategory: Subcategory;     
  gender: Gender[];       
  sizes: Size[];          
  pricePerDay: number;      
  imageUrl: string;     
  description: string;     
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}