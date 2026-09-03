import Hero from '../components/Hero'
import Catalog from '../components/Catalog'
import { getCostumes } from '@/services/costumes'

export default async function Page() {

  const costumes = await getCostumes();

  return (
    <div>
      <Hero/>
      <Catalog initialCostumes={costumes}/>
    </div> 
  );
}