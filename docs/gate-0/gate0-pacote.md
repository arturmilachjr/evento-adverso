# GATE 0 — Pacote de intake e decisões · arturmilach.com.br

## 1. O que foi feito
- Inventário do repositório `arturmilachjr/evento-adverso`: **vazio** (zero commits, zero branches remotas). Nenhum asset no ambiente.
- Foto principal recebida na conversa (retrato de estúdio, fundo escuro, camiseta preta) — direção duotone aprovável, **falta o arquivo em alta**.
- Espécime visual produzido: Paleta A × Paleta B aplicadas às três atmosferas (hero do hub, card de obra, modo papel das crônicas), com a tipografia proposta.
- Revisão adversarial executada (direção de arte, copy/compliance CFM 2.336/2023, contraste WCAG) e correções aplicadas: capnograma fisiologicamente correto (platô ascendente, pico end-tidal antes da queda inspiratória), acento racionado a 3 usos por tela, RQE vinculado explicitamente à Anestesiologia, grafia "espécime", capitular e eyebrows com contraste AA.
- Mapa do site e wireframe ASCII da home propostos abaixo.

## 2. Inventário de inputs
| Input | Status |
|---|---|
| `{{DOMINIO}}` | ✅ arturmilach.com.br |
| `{{FOTO_PRINCIPAL}}` | ⚠️ vista na conversa; falta arquivo em alta no repositório |
| `{{OBRAS_INICIAIS}}` | ❌ pendente (barcos, Disney, outros) |
| `{{CRONICAS}}` | ❌ pendente (ex.: a-toalha-atras-da-porta.html) |
| `{{BIO_E_LINKS}}` | ❌ pendente (bio 3–4 linhas, links, e-mail) |

### Como entregar os assets (caminho recomendado)
No GitHub, em `arturmilachjr/evento-adverso` → botão **Add file → Upload files**, criando esta estrutura:

```
_inbox/
  foto/retrato.jpg          (arquivo original, máxima resolução)
  obras/barcos/…            (HTML e arquivos de cada obra, intactos)
  obras/disney/…
  cronicas/…                (HTMLs existentes e/ou .md)
  bio.md                    (bio 3–4 linhas + links + e-mail de contato)
```

Alternativa: colar bio/links diretamente na conversa e anexar os HTMLs aqui.

## 3. Mapa do site (proposta final — igual ao especificado)
```
/                    Home (hero 3D, manifesto, obras em destaque, crônicas recentes, sobre resumido, contato)
/obras               Galeria completa
/obras/[slug]        Wrapper: contexto + "Abrir experiência" (HTML original intacto)
/cronicas            Índice editorial das Crônicas Kaizen
/cronicas/[slug]     Leitura (modo papel)
/sobre               Trajetória, credenciais, mentoria
/404                 Traço capnográfico em linha reta → retoma o ritmo ao hover
```
Content registry: `src/data/obras.json` e `src/data/cronicas.json` (com `numero_romano` e `data`). Publicar obra nova = pasta em `/public/obras/<slug>/` + 1 entrada no JSON.

## 4. Wireframe ASCII — Home
```
┌──────────────────────────────────────────────────────────────┐
│ NAV   ARTUR MILACH              Obras  Crônicas  Sobre  [→] │
├──────────────────────────────────────────────────────────────┤
│ HERO · 100vh · --ink · campo de partículas respirando        │
│   eyebrow mono                          ┌────────────────┐  │
│   ARTUR MILACH (display XXL)            │  foto duotone  │  │
│   Anestesiologista · Segurança do       │  integrada à   │  │
│   Paciente · IA para Médicos            │  cena (não     │  │
│   CRM-CE 10.695 · RQE 14.411 (mono)     │  "colada")     │  │
│   ~~~/~~\___ traço capnográfico         └────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│ MANIFESTO · 3–4 frases display grandes, reveladas por scroll │
├──────────────────────────────────────────────────────────────┤
│ OBRAS EM DESTAQUE · grid assimétrico                         │
│  ┌──────────────┐ ┌────────┐   hover: zoom ≤1.04, ease longo │
│  │   obra 01    │ │ obra 02│   tilt ≤3°                      │
│  └──────────────┘ └────────┘                                 │
├──────────────────────────────────────────────────────────────┤
│ CRÔNICAS RECENTES · 2–3 cards em modo papel (--bone)         │
│  contraste atmosférico proposital com o hub escuro           │
├──────────────────────────────────────────────────────────────┤
│ SOBRE RESUMIDO · 1 parágrafo + CTA sóbrio → Mentoria de IA   │
├──────────────────────────────────────────────────────────────┤
│ CONTATO (mailto) · FOOTER compliance                         │
│  Artur da Costa Milach Júnior · CRM-CE 10.695 · RQE 14.411   │
│  Publicidade médica conforme Resolução CFM 2.336/2023        │
└──────────────────────────────────────────────────────────────┘
```

## 5. Decisões deste gate (3 perguntas)
1. **Paleta** — A (grafite/osso/ouro/navy contido) vs. B (mono grafite/cobre). Recomendação: **A** — o ouro conversa com a identidade visual pessoal que o Artur já construiu e, a 5.75:1 sobre o grafite, funciona até em corpo de texto; o cobre da B fica limitado a texto grande (3.85:1). Contraponto do diretor de arte: B é a leitura mais literal de "menos cor, mais matéria".
2. **Fonte display** — A) Schibsted Grotesk, a do espécime (recomendado: o que foi aprovado é exatamente o que vai ao ar; self-host e subset garantidos); B) Clash Display (Fontshare é inacessível do ambiente de build — Artur envia o zip em `_inbox/fontes/` e o espécime é re-renderizado para nova aprovação); C) licenciada (PP Neue Montreal, requer compra).
3. **CNPJ no footer** — A) incluir razão social + CNPJ desde já (recomendado: o site divulga atuação médica e a mentoria; identificação completa é a leitura mais segura da CFM 2.336/2023 e custa uma linha discreta em mono); B) omitir até haver oferta direta de serviço.

### Notas de compliance registradas (sem pergunta — defaults propostos)
- "Vinte anos vigiando sinais vitais" no manifesto é afirmação factual: confirmar o tempo exato antes do go-live (CFM exige veracidade).
- 404 com traço capnográfico em linha reta = apneia/parada; para evitar humor com evento crítico, o default proposto é um traço que perde amplitude e ritmo e se recompõe ao hover — decisão fina no Gate 5.

## 6. Checklist de aceite da Fase 0
- [x] Inventário de assets executado (resultado: repositório vazio; pendências listadas)
- [x] Mapa do site proposto
- [x] Paleta A × B apresentadas em espécime visual
- [x] Tipografia proposta apresentada (com restrição de ambiente declarada)
- [x] Wireframe ASCII da home
- [x] Placeholder de CNPJ levado a decisão
- [ ] Inputs pendentes recebidos (foto em alta, obras, crônicas, bio) — **bloqueia o início da Fase 3/4; a Fase 1 pode começar sem eles**
