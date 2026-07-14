import { lazy, Suspense, useEffect, useState } from 'react';

/*
  Casca leve da cena: o chunk 3D (three + r3f) só é baixado se o visitante
  aceita movimento e tem WebGL. Caso contrário, o poster estático permanece.
*/
const CampoRespiratorio = lazy(() => import('./CampoRespiratorio'));

function suportaWebgl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    );
  } catch {
    return false;
  }
}

export default function HeroCena() {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decidir = () => setAtivo(!mq.matches && suportaWebgl());
    decidir();
    mq.addEventListener('change', decidir);
    return () => mq.removeEventListener('change', decidir);
  }, []);

  if (!ativo) return null;

  return (
    <Suspense fallback={null}>
      <CampoRespiratorio />
    </Suspense>
  );
}
