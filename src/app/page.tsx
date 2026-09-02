// src/app/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { Costume } from '../types/costume';

// Функция, которая читает JSON-файл (как будто делает запрос в базу данных)
async function getCostumes(): Promise<Costume[]> {
  const filePath = path.join(process.cwd(), 'src/data/costumes.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function HomePage() {
  const costumes = await getCostumes();

  return (
    <main className="container">
      <section>
        
      </section>
    </main>
  );
}