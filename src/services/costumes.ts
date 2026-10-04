import { Costume } from '../types'

const MOCK_COSTUMES = [
    {
        id: 2010646,
        title: 'Костюм "Пиратка Мини"', 
        category: 'Карнавальные',
        subcategory: 'Приключения',
        gender: ['Женский'],
        sizes: ['46', '48'],
        pricePerDay: 1200,
        imageUrl: '/img/pirate.jpg',
        description: null,
    },
    {
        id: 3020360,
        title: 'Ростовая кукла "Мишка"',
        category: 'Ростовые куклы',
        subcategory: null,
        gender: null,
        sizes: null,
        pricePerDay: 900,
        imageUrl: '/img/pirate.jpg',
        description: null,
    }
]

const responseToCostume = (raw: any): Costume => {
    return {
        id: String(raw.id),               
        title: raw.title,            
        category: raw.category, 
        subcategory: raw.subcategory ?? 'Прочее',     
        gender: Array.isArray(raw.gender) ? raw.gender : (raw.gender ? [raw.gender] : []),       
        sizes: Array.isArray(raw.sizes) ? raw.sizes : (raw.sizes ? [raw.sizes] : []),       
        pricePerDay: raw.pricePerDay,      
        imageUrl: raw.imageUrl,     
        description: raw.description ?? '', 
    }
}

export async function getCostumes(): Promise<Costume[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cleanData = MOCK_COSTUMES.map(responseToCostume);
            resolve(cleanData);
        }, 300)
    });
} 