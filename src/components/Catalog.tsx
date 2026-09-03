'use client'
import { use, useState } from "react";
import { Costume } from "@/types/costume";

interface CatalogProps{
    initialCostumes: Costume[];
}

export default function Catalog({initialCostumes}: CatalogProps) {
    const [costumes] = useState<Costume[]>(initialCostumes)
  return (
    <section className="catalog">
        <h2>Успешно! {costumes.length} шт</h2>
    </section>
  );
}