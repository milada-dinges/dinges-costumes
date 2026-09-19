import { Costume } from '../types/types'

const MOCK_COSTUMES: Costume[] = [
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

export async function getCostumes(): Promise<Costume[]> {
    return new Promise((resolve) => {
        resolve(MOCK_COSTUMES)
    });
} 