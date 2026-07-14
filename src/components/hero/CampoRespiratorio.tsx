import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/*
  Cena-assinatura: campo de partículas orgânico que respira a 6 ciclos/min.
  Respiração assimétrica como a de repouso real — inspiração (~38% do ciclo)
  mais curta que a expiração. Amplitude ~5%: quase subliminar.
*/

const CICLO_S = 10; // 60s / 10s = 6 ciclos por minuto
const FRACAO_INSPIRACAO = 0.38;

function suave(x: number): number {
  return x * x * (3 - 2 * x);
}

export function valorRespiracao(tempoS: number): number {
  const fase = (tempoS % CICLO_S) / CICLO_S;
  return fase < FRACAO_INSPIRACAO
    ? suave(fase / FRACAO_INSPIRACAO)
    : 1 - suave((fase - FRACAO_INSPIRACAO) / (1 - FRACAO_INSPIRACAO));
}

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uBreath;
uniform vec3 uPointer;
uniform float uPointerForca;
uniform float uDpr;
attribute float aSeed;
attribute float aSize;
varying float vSeed;
varying float vAlpha;

void main() {
  vSeed = aSeed;

  // expansão respiratória com defasagem sutil por partícula
  float respiracaoLocal = clamp(uBreath + (aSeed - 0.5) * 0.10, 0.0, 1.0);
  float escala = 1.0 + 0.05 * respiracaoLocal;
  vec3 p = position * escala;

  // deriva orgânica lenta
  float t = uTime * 0.06;
  p.x += sin(t + aSeed * 31.4) * 0.06;
  p.y += cos(t * 0.9 + aSeed * 17.2) * 0.05;
  p.z += sin(t * 1.1 + aSeed * 23.7) * 0.06;

  // repulsão de baixa amplitude ao cursor
  vec2 dif = p.xy - uPointer.xy;
  float d = length(dif);
  float forca = smoothstep(1.6, 0.0, d) * 0.35 * uPointerForca;
  p.xy += (dif / max(d, 1e-4)) * forca;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float tam = aSize * (1.0 + 0.35 * respiracaoLocal);
  gl_PointSize = tam * uDpr * (26.0 / -mv.z);
  vAlpha = smoothstep(16.0, 5.0, -mv.z);
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uCorBase;
uniform vec3 uCorAcento;
varying float vSeed;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float disco = smoothstep(0.5, 0.12, length(uv));
  if (disco < 0.001) discard;
  vec3 cor = mix(uCorBase, uCorAcento, step(0.82, vSeed) * 0.85);
  float alfa = disco * (0.10 + 0.22 * vSeed) * vAlpha;
  gl_FragColor = vec4(cor, alfa);
}
`;

function Particulas({ contagem }: { contagem: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const alvoPonteiro = useRef(new THREE.Vector3(0, 0, 0));
  const ndc = useRef<{ x: number; y: number } | null>(null);
  const { camera, gl } = useThree();

  const { posicoes, seeds, tamanhos } = useMemo(() => {
    const posicoes = new Float32Array(contagem * 3);
    const seeds = new Float32Array(contagem);
    const tamanhos = new Float32Array(contagem);
    // gerador determinístico: mesma nuvem em todo carregamento (poster fiel)
    let s = 421;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    for (let i = 0; i < contagem; i++) {
      // direção uniforme na esfera
      const u = rnd() * 2 - 1;
      const ang = rnd() * Math.PI * 2;
      const raioXY = Math.sqrt(1 - u * u);
      // densidade concentrada na casca externa, com miolo esparso
      const r = 0.45 + 0.55 * Math.cbrt(rnd());
      let x = raioXY * Math.cos(ang) * r;
      let y = raioXY * Math.sin(ang) * r;
      let z = u * r;
      // elipsoide achatado + ondulação de baixa frequência: massa orgânica, não esfera
      x *= 2.35;
      y *= 1.18;
      z *= 0.92;
      y += Math.sin(x * 1.4 + 2.0) * 0.16;
      z += Math.sin(y * 2.2 + 0.7) * 0.12;
      posicoes.set([x, y, z], i * 3);
      seeds[i] = rnd();
      tamanhos[i] = 0.9 + rnd() * 1.6;
    }
    return { posicoes, seeds, tamanhos };
  }, [contagem]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBreath: { value: 0 },
      uPointer: { value: new THREE.Vector3(99, 99, 0) },
      uPointerForca: { value: 0 },
      uDpr: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uCorBase: { value: new THREE.Color('#8A94A6') },
      uCorAcento: { value: new THREE.Color('#B08D3E') },
    }),
    []
  );

  useEffect(() => {
    // repulsão só onde há cursor de verdade
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const aoMover = (e: PointerEvent) => {
      ndc.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('pointermove', aoMover, { passive: true });
    return () => window.removeEventListener('pointermove', aoMover);
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    return () => {
      // dispose completo em troca de rota
      gl.dispose();
      canvas.remove();
    };
  }, [gl]);

  const vetor = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!material.current) return;
    const t = clock.elapsedTime;
    const respiracao = valorRespiracao(t);
    material.current.uniforms.uTime.value = t;
    material.current.uniforms.uBreath.value = respiracao;

    // instrumentação de QA: frequência verificável de fora
    (window as any).__respiracao = {
      valor: respiracao,
      cicloSegundos: CICLO_S,
      ciclosPorMinuto: 60 / CICLO_S,
    };

    const uPointer = material.current.uniforms.uPointer.value as THREE.Vector3;
    const uForca = material.current.uniforms.uPointerForca;
    if (ndc.current) {
      vetor.set(ndc.current.x, ndc.current.y, 0.5).unproject(camera);
      const dir = vetor.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      alvoPonteiro.current.copy(camera.position).addScaledVector(dir, dist);
      uPointer.lerp(alvoPonteiro.current, 0.06);
      uForca.value = THREE.MathUtils.lerp(uForca.value, 1, 0.04);
    }
  });

  return (
    <points position={[1.1, 0.1, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posicoes, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[tamanhos, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CampoRespiratorio() {
  const moldura = useRef<HTMLDivElement>(null);
  const [noViewport, setNoViewport] = useState(true);
  const [pronto, setPronto] = useState(false);

  const contagem = useMemo(
    () => (window.innerWidth < 768 ? 2200 : 5500), // mobile ≤ 40% do desktop
    []
  );

  useEffect(() => {
    if (!moldura.current) return;
    const io = new IntersectionObserver(
      ([entrada]) => setNoViewport(entrada?.isIntersecting ?? true),
      { threshold: 0.05 }
    );
    io.observe(moldura.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={moldura}
      className={`campo-respiratorio${pronto ? ' pronto' : ''}`}
      aria-hidden="true"
    >
      <Canvas
        frameloop={noViewport ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 7.5] }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        onCreated={() => requestAnimationFrame(() => setPronto(true))}
      >
        <Particulas contagem={contagem} />
      </Canvas>
    </div>
  );
}
