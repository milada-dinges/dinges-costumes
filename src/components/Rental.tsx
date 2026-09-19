'use client';

import { useState } from "react";
import { FAQ } from "../types/types"

import Image from "next/image";


interface rentalPops{
  questions: FAQ[];
}


export default function Rental({questions}: rentalPops) {

  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  return (
    <section className="rental-terms section">
      <h2>Условия аренды</h2>
      <div className="rental-terms__group">
        {questions.map((q) => (
          
          <div className={`rental-terms__question ${activeQuestion === q.id ? 'rental-terms__question__active' : ''}`} key={q.id} >

            <button className={`rental-terms__btn ${activeQuestion === q.id ? 'rental-terms__btn__active' : ''}`} onClick={() => {setActiveQuestion(activeQuestion === q.id ? null : q.id)}}>
              {q.question}
              <div className={`rental-terms__arrow-container ${activeQuestion === q.id ? 'rental-terms__arrow-container__active' : ''}`}>
                <Image className='rental-terms__arrow' src='/icons/arrow.svg' width={18} height={9} alt=""></Image>
              </div>
            </button>

            {activeQuestion === q.id && (
              <div className="rental-terms__answer">
                <p>{q.answer}</p>
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
} 
