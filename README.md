# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# FinanceFlow - Gestão Financeira Pessoal

Sistema completo de gestão financeira pessoal com gamificação, desenvolvido com base em artigo acadêmico sobre educação financeira e tecnologia.

## Funcionalidades Principais

### Autenticação e Perfis
- Sistema completo de login e cadastro
- Perfis personalizáveis (Conservador, Moderado, Impulsivo)
- Autenticação segura com JWT via Supabase

### Gestão Financeira
- Registro e categorização de receitas e despesas
- Categorias padrão e customizáveis
- Filtros e buscas avançadas
- Edição e exclusão de transações

### Metas Financeiras
- Criação de metas com valores alvo e prazos
- Acompanhamento de progresso em tempo real
- Sistema de contribuições incrementais
- Status de metas (Ativa, Concluída, Cancelada)

### Relatórios e Análises
- Gráficos de evolução mensal (últimos 6 meses)
- Análise de despesas por categoria
- Tabelas resumidas com saldos
- Visualizações com Chart.js

### Sistema de Gamificação
- Sistema de níveis e pontos
- 10 conquistas diferentes para desbloquear
- Requisitos variados (transações, metas, economia)
- Feedback visual de progresso

### Notificações Inteligentes
- Alertas de orçamento excedido
- Notificações de conquistas desbloqueadas
- Alertas de gastos por categoria
- Notificações de metas completadas
- Sistema em tempo real com Supabase Realtime

## Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **Chart.js + react-chartjs-2** - Gráficos e visualizações
- **Lucide React** - Ícones modernos

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL - Banco de dados
  - Authentication - Sistema de autenticação
  - Row Level Security - Segurança de dados
  - Edge Functions - Serverless functions
  - Realtime - Atualizações em tempo real

### Edge Functions
- `check-achievements` - Verifica e desbloqueia conquistas
- `check-budget-alerts` - Monitora orçamento e envia alertas

## Estrutura do Banco de Dados

### Tabelas Principais
- **users_profiles** - Perfis estendidos dos usuários
- **categories** - Categorias de transações
- **transactions** - Registro de movimentações financeiras
- **goals** - Metas financeiras
- **achievements** - Sistema de conquistas
- **user_achievements** - Conquistas desbloqueadas
- **notifications** - Sistema de notificações

## Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn
- Conta Supabase

### Passo 1: Clone o Repositório
```bash
git clone <repository-url>
cd project
```

### Passo 2: Instale as Dependências
```bash
npm install
```

### Passo 3: Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=seu_supabase_url
VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
```

Para obter essas credenciais:
1. Acesse [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings > API
4. Copie a URL e a anon key

### Passo 4: Execute as Migrações

As migrações já foram aplicadas no banco de dados Supabase. Caso precise reaplicar, acesse o SQL Editor no Supabase e execute o conteúdo das migrações.

### Passo 5: Inicie o Servidor de Desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Passo 6: Build para Produção
```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

## Como Usar

### 1. Criar Conta
- Acesse a aplicação
- Clique em "Não tem conta? Cadastre-se"
- Preencha nome, email, senha e escolha seu perfil financeiro
- Clique em "Criar conta"

### 2. Adicionar Transações
- No menu, clique em "Transações"
- Clique no botão "Nova Transação"
- Escolha o tipo (Receita ou Despesa)
- Selecione a categoria
- Preencha valor, descrição e data
- Clique em "Adicionar"

### 3. Criar Metas
- No menu, clique em "Metas"
- Clique no botão "Nova Meta"
- Defina título, descrição, valor alvo e prazo
- Clique em "Criar Meta"
- Adicione progresso conforme economizar

### 4. Visualizar Relatórios
- No menu, clique em "Relatórios"
- Veja gráficos de evolução mensal
- Analise despesas por categoria
- Consulte tabela resumida

### 5. Acompanhar Conquistas
- Clique no ícone de troféu no cabeçalho
- Veja conquistas desbloqueadas
- Confira requisitos das conquistas bloqueadas
- Ganhe pontos e suba de nível

### 6. Gerenciar Notificações
- Clique no ícone de sino no cabeçalho
- Visualize todas as notificações
- Marque como lidas
- Delete notificações antigas

## Perfis Financeiros

### Conservador
- Foco em economia e segurança
- Alertas mais sensíveis
- Recomendações de economia

### Moderado
- Equilíbrio entre gastar e poupar
- Alertas balanceados
- Recomendações variadas

### Impulsivo
- Tendência a gastos maiores
- Alertas mais frequentes
- Dicas de controle financeiro

## Sistema de Gamificação

### Níveis
- Cada 100 pontos = 1 nível
- Nível exibido no perfil
- Barra de progresso visual

### Conquistas Disponíveis
1. **Primeiro Passo** (10 pts) - Primeira transação
2. **Iniciante** (25 pts) - 10 transações
3. **Consistente** (50 pts) - 50 transações
4. **Expert** (100 pts) - 100 transações
5. **Sonhador** (15 pts) - Primeira meta
6. **Conquistador** (50 pts) - Meta completa
7. **Determinado** (150 pts) - 5 metas completas
8. **Poupador** (75 pts) - R$ 1.000 economizados
9. **Investidor** (200 pts) - R$ 5.000 economizados
10. **Milionário em potencial** (500 pts) - R$ 10.000 economizados

## Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Usuários só acessam seus próprios dados
- Autenticação JWT via Supabase
- Validações no frontend e backend
- Queries otimizadas e seguras

## Deploy

### Vercel (Recomendado)
1. Faça push do código para GitHub
2. Importe o projeto no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Outras Plataformas
- Netlify
- Railway
- Render
- Cloudflare Pages

## Estrutura de Pastas

```
project/
├── src/
│   ├── components/
│   │   ├── Auth/           # Componentes de autenticação
│   │   ├── Dashboard/      # Dashboard e estatísticas
│   │   ├── Transactions/   # Gestão de transações
│   │   ├── Goals/          # Sistema de metas
│   │   ├── Reports/        # Relatórios e gráficos
│   │   ├── Achievements/   # Sistema de conquistas
│   │   ├── Notifications/  # Central de notificações
│   │   ├── Profile/        # Perfil do usuário
│   │   └── Layout/         # Header e Navigation
│   ├── contexts/
│   │   └── AuthContext.jsx # Contexto de autenticação
│   ├── hooks/
│   │   ├── useTransactions.js
│   │   ├── useGoals.js
│   │   ├── useAchievements.js
│   │   ├── useNotifications.js
│   │   └── useCategories.js
│   ├── lib/
│   │   └── supabase.js     # Cliente Supabase
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globais
├── supabase/
│   └── functions/          # Edge Functions
│       ├── check-achievements/
│       └── check-budget-alerts/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Suporte

Para dúvidas ou problemas, consulte a documentação oficial:
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Chart.js Docs](https://www.chartjs.org/docs)

## Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.

---

Desenvolvido com base no artigo: "Gestão Financeira Pessoal: Desenvolvimento de um Protótipo de Software para Controle Financeiro"
