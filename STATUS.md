# STATUS — máquina de estados do projeto

**Fase atual: 1 — Fundação (gate apresentado, aguardando `APROVADO FASE 1`)**

| Fase | Estado | Gate |
|---|---|---|
| 0 — Intake e decisões | ✅ CONCLUÍDA | `APROVADO FASE 0` (14/07/2026) |
| 1 — Fundação | 🔎 GATE APRESENTADO | verificado: 6,0 ciclos/min; reduced-motion ok; JS inicial ~69KB gzip; chunk 3D 233KB gzip |
| 2 — Home completa | ⏸ pendente | — |
| 3 — Galeria /obras | ⏸ pendente | bloqueada por assets do `_inbox/` |
| 4 — Crônicas | ⏸ pendente | bloqueada por assets do `_inbox/` |
| 5 — Sobre, compliance, SEO | ⏸ pendente | — |
| 6 — QA e lançamento | ⏸ pendente | — |

## Decisões tomadas (Gate 0)

1. **Paleta A** — grafite/osso/ouro envelhecido/navy contido (navy usado como elevação via `--surface`, nunca como segundo acento).
2. **Display: Schibsted Grotesk** — a fonte aprovada no espécime (Fontshare inacessível do build; Clash Display descartada).
3. **CNPJ no footer: incluir desde já** — Artur da C. M. Junior LTDA · CNPJ 59.169.766/0001-47.
4. Acento racionado (~3 usos/tela); capnograma fisiologicamente correto; RQE sempre vinculado a "(Anestesiologia)".

## Notas de compliance registradas

- Manifesto "Vinte anos vigiando sinais vitais": confirmar tempo exato de prática com o Artur antes do go-live (CFM 2.336/2023 exige veracidade).
- 404: evitar capnografia em linha reta (apneia/parada como piada); default proposto = traço que perde amplitude e se recompõe ao hover. Decisão fina no Gate 5.

## Pendência de infraestrutura

- **Deploy de preview na Vercel bloqueado**: o token da integração desta sessão não tem permissão para criar projetos no time `arturmilachjr-6835s-projects` (HTTP 403). Caminho recomendado: Artur importa o repositório `arturmilachjr/evento-adverso` no painel da Vercel (Add New → Project) — cria o projeto e ativa deploy automático a cada push. O build local passa e o site funciona no preview local.
- Repositório nasceu vazio: a branch `claude/artur-milach-portfolio-uwukj6` virou a default no primeiro push; não há branch base para abrir PR.

## Pendências de assets (entregar em `_inbox/` no GitHub)

- [ ] `_inbox/foto/retrato.jpg` — retrato em alta (visto na conversa, arquivo pendente)
- [ ] `_inbox/obras/barcos/…` e `_inbox/obras/disney/…` — HTMLs intactos
- [ ] `_inbox/cronicas/…` — HTMLs existentes e/ou .md
- [ ] `_inbox/bio.md` — bio 3–4 linhas + links + e-mail de contato

## Registro do espécime (Gate 0)

Arquivos em `docs/gate-0/` (espécime HTML + screenshots das paletas). Para re-renderizar: `npm i` e abrir `docs/gate-0/especimen.html` (usa fontes de `node_modules`).
