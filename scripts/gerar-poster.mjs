/*
  Gera o poster estático do hero (public/hero-poster.svg) a partir da MESMA
  distribuição determinística de partículas da cena 3D (ver
  src/components/hero/CampoRespiratorio.tsx — LCG seed 421). Roda no prebuild:
  poster e cena nunca divergem, e o asset é texto puro (sem binário no repo).
*/
import { writeFileSync, mkdirSync } from 'node:fs';

const LARGURA = 800;
const ALTURA = 450;
const CONTAGEM = 5500;
const AMOSTRA = 4; // 1 a cada 4 partículas no poster
const CAM_Z = 7.5;
const FOV_RAD = (45 * Math.PI) / 180;
const OFFSET = { x: 1.1, y: 0.1 };

let s = 421;
const rnd = () => {
  s = (s * 16807) % 2147483647;
  return (s - 1) / 2147483646;
};

const tanMeioFov = Math.tan(FOV_RAD / 2);
const aspecto = LARGURA / ALTURA;
const circulos = [];

for (let i = 0; i < CONTAGEM; i++) {
  const u = rnd() * 2 - 1;
  const ang = rnd() * Math.PI * 2;
  const raioXY = Math.sqrt(1 - u * u);
  const r = 0.45 + 0.55 * Math.cbrt(rnd());
  let x = raioXY * Math.cos(ang) * r;
  let y = raioXY * Math.sin(ang) * r;
  let z = u * r;
  x *= 2.35;
  y *= 1.18;
  z *= 0.92;
  y += Math.sin(x * 1.4 + 2.0) * 0.16;
  z += Math.sin(y * 2.2 + 0.7) * 0.12;
  const seed = rnd();
  const tam = 0.9 + rnd() * 1.6;

  if (i % AMOSTRA !== 0) continue;

  const px = x + OFFSET.x;
  const py = y + OFFSET.y;
  const prof = CAM_Z - z;
  const ndcY = py / (prof * tanMeioFov);
  const ndcX = px / (prof * tanMeioFov * aspecto);
  const cx = LARGURA / 2 + ndcX * (LARGURA / 2);
  const cy = ALTURA / 2 - ndcY * (ALTURA / 2);
  if (cx < -8 || cx > LARGURA + 8 || cy < -8 || cy > ALTURA + 8) continue;

  const raio = ((tam * 26) / prof) * 0.25;
  const cor = seed > 0.82 ? '#B08D3E' : '#8A94A6';
  const opacidade = (0.14 + 0.3 * seed).toFixed(2);
  circulos.push(
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${raio.toFixed(2)}" fill="${cor}" fill-opacity="${opacidade}"/>`
  );
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LARGURA} ${ALTURA}" preserveAspectRatio="xMidYMid slice">
<rect width="${LARGURA}" height="${ALTURA}" fill="#14171C"/>
<g filter="url(#suavizar)">
${circulos.join('\n')}
</g>
<defs><filter id="suavizar" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.7"/></filter></defs>
</svg>
`;

mkdirSync('public', { recursive: true });
writeFileSync('public/hero-poster.svg', svg);
console.log(`poster gerado: public/hero-poster.svg (${circulos.length} partículas, ${(svg.length / 1024).toFixed(0)}KB)`);
