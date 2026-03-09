# FeeAgro — RWA Dashboard

Mini-dashboard de banking/Web3 focado em RWA do agronegócio brasileiro (Soja e Milho), desenvolvido como teste técnico para vaga de Desenvolvedor Frontend Sênior.

## Como rodar

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint
npm test
npm run test:coverage
```

## Stack

| Tecnologia | Versão | Motivo |
|---|---|---|
| Next.js (App Router) | 16 | SSR/SSG, roteamento por pasta, Server Components |
| React | 19 | Base |
| TypeScript | 5 | Tipagem estrita em toda a codebase |
| Tailwind CSS | v4 | Design tokens via `@theme` no CSS (sem config.js) |
| react-hook-form + zod | latest | Formulários tipados com validação declarativa |
| Recharts | 3 | Gráfico de área do portfólio (React 19 compatível) |
| lucide-react | latest | Ícones leves e consistentes |
| clsx + tailwind-merge | latest | Composição de classes sem conflito |
| Jest + Testing Library | latest | Testes unitários e de integração |

## Arquitetura

```
src/
├── app/               # Rotas (Next.js App Router)
│   ├── dashboard/
│   ├── transactions/
│   └── operations/
├── components/
│   ├── ui/            # Primitivos (Button, Card, Badge, Skeleton, Modal)
│   └── layout/        # Sidebar, AppShell
├── features/          # Componentes de domínio por feature
│   ├── dashboard/
│   ├── transactions/
│   └── operations/
├── hooks/             # Estado isolado (useDashboard, useTransactions, useOperation)
├── lib/               # Utilitários puros (cn, format, mock-data)
└── types/             # Interfaces TypeScript compartilhadas
```

**Princípios:**
- **Feature-based**: cada domínio é isolado e autocontido
- **Hooks como camada de dados**: toda lógica de estado vive nos hooks; componentes só renderizam
- **UI primitivos desacoplados**: sem lógica de negócio nos componentes de `ui/`
- **Tipagem total**: sem `any`, interfaces centralizadas em `types/index.ts`

## Páginas

| Rota | Descrição |
|---|---|
| `/dashboard` | Cards de saldo, portfólio RWA (Soja/Milho), status KYC, gráfico sparkline e transações recentes |
| `/transactions` | Lista filtrada por tipo/status/busca, ordenação por data/valor, modal de detalhes |
| `/operations` | Formulário validado (zod), modal de confirmação e estado de sucesso |

## Escolhas técnicas e trade-offs

- **Dados mockados com delay simulado**: 600–800ms de latência artificial nos hooks para loading states realistas. Substituir por chamadas reais não exige mudanças nos componentes
- **Tailwind v4**: `@theme {}` em CSS elimina o `tailwind.config.js` e centraliza os tokens de design no `globals.css`
- **Server vs Client Components**: só usa `'use client'` onde há estado ou interação; componentes puramente visuais são Server Components
- **Modal acessível**: `role="dialog"`, `aria-modal`, `aria-labelledby`, fechamento por `Escape` e clique fora
- **Mobile-first**: sidebar colapsável com drawer em mobile; tabelas com colunas progressivamente visíveis

## O que melhoraria com mais tempo

- Autenticação com NextAuth.js (login/logout real)
- Integração com API real ou contrato Web3 (wagmi + viem)
- Paginação server-side nas transações
- Dark mode com `prefers-color-scheme`
- Testes E2E com Playwright
- React Query para cache e revalidação automática
- Deploy na Vercel com CI/CD automático
