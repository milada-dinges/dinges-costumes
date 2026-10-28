import { Costume } from '../types'
import { supabase } from './supabase';

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
    const { data, error } = await supabase
    .from('costumes')
    .select('*')
    .order('id', {ascending: false});

    console.log('СЫРЫЕ ДАННЫЕ ИЗ БАЗЫ:', { data, error, errorMessage: error?.message });

    if (error) {
        console.error('ошибка получения данных', error);
        return [];
    }
    return (data || []).map(responseToCostume);
} 