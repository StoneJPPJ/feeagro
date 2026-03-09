# FeeAgro — RWA Dashboard

Mini-dashboard de banking/Web3 focado em RWA do agronegócio brasileiro (Soja e Milho), desenvolvido como teste técnico para vaga de Desenvolvedor.

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

| Tecnologia | Versão |
|---|---|
| Next.js (App Router) | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 |
| react-hook-form + zod | ultima versão |
| Recharts | 3 |
| lucide-react | ultima versão |
| Jest + Testing Library | ultima versão |

## Arquitetura

```
src/
├── app/               # Rotas (Next.js App Router)
│   ├── layout.tsx     # AppShell + tema global
│   ├── page.tsx       # Landing / redireciona para dashboard
│   ├── dashboard/     # Página principal com bento-grid
│   ├── transactions/  # Histórico de transações
│   └── operations/    # Nova operação (PIX, transferência, RWA)
├── components/
│   ├── ui/            # Primitivos (Button, Card, Badge, Skeleton, Modal)
│   └── layout/        # Sidebar, AppShell, user menu, toggle de tema
├── features/          # Componentes de domínio por feature
│   ├── dashboard/     # BalanceCard, PortfolioCard, KycStatusCard, PortfolioChart
│   ├── transactions/  # Filters, listagem, modal de transação
│   └── operations/    # Formulário, resumo e fluxo de sucesso
├── hooks/             # Estado isolado (useDashboard, useTransactions, useOperation)
├── lib/               # Utilitários puros (cn, format, mock-data)
└── types/             # Interfaces TypeScript compartilhadas
```

**Princípios:**
- **Feature-based**: cada domínio é isolado e autocontido
- **Hooks como camada de dados**: toda lógica de estado vive nos hooks; componentes só renderizam
- **UI primitivos desacoplados**: sem lógica de negócio nos componentes de `ui/`
- **Tipagem total**: sem `any`, interfaces centralizadas em `types/index.ts`

## Páginas e fluxo atual

| Rota | Descrição |
|---|---|
| `/dashboard` | Hero card de saldo com gradientes dark/light, portfólio RWA (Soja/Milho), status KYC, gráfico de lucro por safra e transações recentes. Em mobile, ícones de navegação (dashboard / transações / operações) na mesma linha do nome do usuário. |
| `/transactions` | Lista filtrada por tipo/status/busca, ordenação por data/valor, modal de detalhes. Em mobile, botão de “X” no canto superior esquerdo (abaixo do logo) para voltar ao dashboard. |
| `/operations` | Formulário validado com react-hook-form + zod (campos de tipo, beneficiário, valor com máscara pt-BR e descrição), mensagens de erro em português e em destaque, modal de confirmação e estado de sucesso. Também possui botão de “X” em mobile para voltar ao dashboard. |

## Tema, design tokens e responsividade

- **Tema dark/light**: controlado via hook `useTheme` com persistência em `localStorage` e atributo `data-theme` no `<html>`. O anti-flash é feito com script inline em `layout.tsx`.
- **Gradientes do card de saldo**:
  - `.balance-card` (modo escuro): gradiente teal/navy com “spotlight” verde central e highlight dourado, seguindo o layout de referência.
  - `[data-theme="light"] .balance-card` (modo claro): gradiente verde com topo cremoso-amarelado; títulos e id da conta usam a mesma cor do valor principal.
- **Tokens via `@theme`**: cores de superfície, acentos de verde/amarelo, tipografia e bordas configurados em `src/app/globals.css`, inclusive overrides específicos para o modo claro (sidebar, botões, inputs, etc.).
- **Botões**: variantes `primary` e `secondary` usam classes auxiliares (`btn-primary`, `btn-secondary`) para receber overrides de cor por tema. Em modo claro os botões seguem o layout com primário verde escuro e secundário verde claro.
- **Responsividade**:
  - `AppShell` usa sidebar fixa em desktop e conteúdo centralizado em mobile.
  - Dashboard em bento-grid (`lg:grid-cols-12`), cards com `row-span` e `col-span` para layout tipo painel.
  - Tabelas mostram/ocultam colunas progressivamente (`sm:`, `md:`).

## Escolhas técnicas e trade-offs

- **Dados mockados com delay simulado**: 600–800ms de latência artificial nos hooks para loading states realistas. Substituir por chamadas reais não exige mudanças nos componentes.
- **Tailwind v4 + `@theme`**: elimina `tailwind.config.js` e centraliza tokens no `globals.css`, facilitando ajustes finos de cores e gradientes.
- **Server vs Client Components**: só usa `'use client'` onde há estado (hooks, formulários, tema); componentes puramente visuais permanecem como Server Components.
- **Formulários robustos**: validação declarativa com zod, mensagens em português e mascaramento de moeda pt-BR; erros de tipo do zod são normalizados para mensagens amigáveis.
- **Modal acessível**: `role="dialog"`, `aria-modal`, `aria-labelledby`, fechamento por `Escape` e clique fora.
- **Mobile-first**: navegação por ícones no header do dashboard, botões de fechar nas abas de transações/operações e layouts que se adaptam bem em telas pequenas.

## O que melhoraria com mais tempo

- Integração com API real ou contrato Web3
- Deploy na Vercel com CI/CD automático
- Conexão com banco de dados para registro das operações
