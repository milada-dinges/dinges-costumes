'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; 
}) {
  useEffect(() => {
    // Логируем системную ошибку в консоль для программистов
    console.error('Критический сбой каталога:', error);
  }, [error]);

  return (
     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center'}}>
        <div className='main' style={{marginTop: '150px'}}>
            <p>Ошибка сети или доступа</p>
            
            <button style={{width: 'min-content'}} type="button" onClick={() => reset()} className="retryBtn">
                    Повторить попытку
            </button>
        </div>
    </div>
  );
}