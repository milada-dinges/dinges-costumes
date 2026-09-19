import Hero from '../components/Hero'
import Catalog from '../components/Catalog'
import Rental from '@/components/Rental'

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