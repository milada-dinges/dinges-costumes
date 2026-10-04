import Hero from '../components/sections/Hero'
import Catalog from '../components/features/Catalog'
import Rental from '@/components/features/Rental'

import { getCostumes } from '@/services/costumes'
import { FAQs } from '../data/FAQs'

export default async function Page() {

  const costumes = await getCostumes();

  return (
    <div className="main">
      <Hero/>
      <Catalog initialCostumes={costumes}/>
      <Rental questions={FAQs}/>
    </div> 
  );
}