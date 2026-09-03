import { Costume } from '../types/costume'

const MOCK_COSTUMES: Costume[] = [
    {
        id: '1',
        title: 'Эльза',
        category: 'Карнавальные',
        subcategory: 'Карнавальные',
        gender: 'женский',
        sizes: ['46', '48'],
        pricePerDay: 1400,
        imageUrl: '/',
        description: 'string',
    }
]

export async function getCostumes(): Promise<Costume[]> {
    return new Promise((resolve) => {
        resolve(MOCK_COSTUMES)
    });
} 