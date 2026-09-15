import { Costume } from '../types/costume'

const MOCK_COSTUMES: Costume[] = [
    {
        id: '1',
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
        id: '2',
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