# arturmilach.com.br — contexto do projeto

Site pessoal de **Artur da Costa Milach Júnior** — médico anestesiologista (CRM-CE 10.695 · RQE 14.411), especialista em segurança do paciente e mentor de IA para médicos. Três papéis num só site: hub de autoridade profissional, galeria de obras interativas e espaço editorial (Crônicas do Kaizen).

## Regras invioláveis

1. **Obras legadas são artefatos finalizados.** HTMLs de obras e crônicas existentes vão intactos para `/public/obras/<slug>/`. Nunca reescrever, "melhorar" ou reestilizar o código interno delas. QA exige diff vazio contra o original.
2. **Idioma:** PT-BR integral, gramática normativa, todos os diacríticos. Termos técnicos consagrados ficam em inglês. Commits em PT-BR.
3. **Compliance:** publicidade médica conforme Resolução CFM 2.336/2023 — sem promessa de resultado, sem valores, sem sensacionalismo. Footer de compliance em 100% das rotas (nome completo, CRM/RQE com especialidade, razão social + CNPJ).
4. **Execução em fases com gates.** Uma fase por vez; pacote de gate; aguardar `APROVADO FASE N`. Estado vivo em `STATUS.md`.
5. **Anti-padrões proibidos:** gradiente roxo/azul de template, glassmorphism, estética terracota-creme default de IA, emojis em superfície do site, animação onipresente, copy de venda inflada, numbered markers sem sequência real, pills de raio 99px.
6. **Acento cromático racionado:** no máximo ~3 usos de `--gold` por tela (decisão do Gate 0).

## Conceito de design

**"Precisão que respira."** Superfícies escuras calmas (hub), instrumentação tipográfica precisa, um único elemento vivo: partículas que respiram a 6 ciclos/min (respiração assimétrica: inspiração ~38% do ciclo). Calor de papel (`--bone`) nas crônicas. Motivo gráfico secundário: **traço capnográfico** fisiologicamente correto — fase II íngreme, platô alveolar levemente ascendente, pico end-tidal imediatamente antes da queda inspiratória (ver `src/components/Capno.astro`).

## Stack

Astro 5 estático + React islands (só onde há interatividade real) · Three.js via R3F (lazy, chunk separado) · GSAP + ScrollTrigger + Lenis (Fase 2) · View Transitions · CSS puro com tokens em `src/styles/tokens.css` (sem Tailwind) · Deploy Vercel · fontes self-hosted via Fontsource (Schibsted Grotesk Variable, Fraunces Variable, Geist Mono).

## Decisões de tokens (Gate 0 — aprovado)

Paleta A: `--ink #14171C` · `--bone #EDE8DD` · `--gold #B08D3E` · `--navy #24344D` (usar via `--surface`, contido como elevação) · `--mist #8A94A6`. Combinações verificadas WCAG AA — usar os derivados prontos de `tokens.css` (`--gold-on-bone`, `--mist-on-bone` etc.), nunca acento puro sobre osso em texto.

## Content registry (Fase 3+)

`src/data/obras.json` e `src/data/cronicas.json` (este com `numero_romano` e `data`). Publicar obra nova = pasta em `/public/obras/<slug>/` + 1 entrada no JSON. Zero refactor.

## Orçamento de qualidade (gate de lançamento)

Lighthouse mobile ≥ 90×4 · LCP < 2,5s · CLS < 0,1 · INP < 200ms · JS inicial < 150KB gzip (excluindo chunk 3D lazy) · chunk 3D < 400KB gzip · WCAG 2.1 AA · responsivo 360–1920px · `prefers-reduced-motion` respeitado nas três atmosferas.

## Ambiente

- Fontshare e jsDelivr são inacessíveis do ambiente de build (proxy); npm e Google Fonts funcionam.
- Assets do cliente chegam via `_inbox/` no repositório (foto, obras, crônicas, bio) — inventário pendente em `STATUS.md`.
