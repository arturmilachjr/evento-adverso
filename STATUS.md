# STATUS — máquina de estados do projeto

**Fase atual: 1 — Fundação (em execução, gate pendente)**

| Fase | Estado | Gate |
|---|---|---|
| 0 — Intake e decisões | ✅ CONCLUÍDA | `APROVADO FASE 0` (14/07/2026) |
| 1 — Fundação | 🔧 EM EXECUÇÃO | aguardando pacote de gate |
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

## Pendências de assets (entregar em `_inbox/` no GitHub)

- [ ] `_inbox/foto/retrato.jpg` — retrato em alta (visto na conversa, arquivo pendente)
- [ ] `_inbox/obras/barcos/…` e `_inbox/obras/disney/…` — HTMLs intactos
- [ ] `_inbox/cronicas/…` — HTMLs existentes e/ou .md
- [ ] `_inbox/bio.md` — bio 3–4 linhas + links + e-mail de contato

## Registro do espécime (Gate 0)

Arquivos em `docs/gate-0/` (espécime HTML + screenshots das paletas). Para re-renderizar: `npm i` e abrir `docs/gate-0/especimen.html` (usa fontes de `node_modules`).
