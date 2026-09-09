import { Costume } from '../types/costume'

const MOCK_COSTUMES: Costume[] = [
    {
        id: '1',
        title: 'Эльза',
        category: 'Карнавальные',
        subcategory: 'Новый год',
        gender: ['Женский'],
        sizes: ['46', '48'],
        pricePerDay: 1400,
        imageUrl: '/img/pirate.jpg',
        description: 'string',
    }
]

export async function getCostumes(): Promise<Costume[]> {
    return new Promise((resolve) => {
        resolve(MOCK_COSTUMES)
    });
} 