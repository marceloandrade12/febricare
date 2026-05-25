# 🌡️ FebriCare

**Registo de febre e medicação para crianças**

Uma Web App responsiva para pais registarem temperaturas (febres) e medicação administrada (Brufen/Benuron), com gráficos de evolução e histórico completo.

---

## 🚀 Início rápido

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- npm / pnpm / yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

A app fica disponível em `http://localhost:5173`

---

## 🏗️ Arquitetura

```
src/
├── components/
│   ├── charts/         # Gráficos (Recharts)
│   ├── forms/          # Formulários de input + modais
│   ├── layout/         # Header, Dashboard, EmptyState, ChildSelector
│   ├── table/          # Tabela de registos
│   └── ui/             # Componentes base (Modal)
├── store/
│   └── useAppStore.ts  # Zustand store (com persistência localStorage)
├── types/
│   └── index.ts        # Tipos TypeScript
├── lib/
│   └── utils.ts        # Utilitários
├── App.tsx
├── main.tsx
└── index.css
```

### Stack
| Tecnologia | Uso |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Zustand | State management |
| Tailwind CSS | Styling |
| Recharts | Gráficos |
| date-fns | Formatação de datas |
| Vite | Build tool |

---

## 📋 Funcionalidades

- ✅ **Múltiplos perfis de crianças** com cores personalizáveis
- ✅ **Registo de temperatura** com data/hora e notas
- ✅ **Registo de medicação** (Brufen/Benuron) com dosagem e notas
- ✅ **Gráfico de evolução** com referências de febre e marcadores de medicação
- ✅ **Tabela de registos** ordenável com eliminação confirmada
- ✅ **Persistência em localStorage** (automática via Zustand persist)
- ✅ **UI responsiva** mobile-first
- ✅ **Acessível** com focus management, aria labels, keyboard navigation

---

## 🔮 Evolução futura

### Migração para Base de Dados
O store (`src/store/useAppStore.ts`) está preparado para migração. Para integrar uma API:

1. Remover o `persist` middleware do Zustand
2. Substituir as acções locais por chamadas `fetch()` / `axios`
3. Adicionar loading states e error handling
4. Considerar React Query / TanStack Query para caching

### Sugestões de roadmap
- [ ] Autenticação (NextAuth / Supabase Auth)
- [ ] Sincronização multi-dispositivo
- [ ] Notificações de intervalo de medicação
- [ ] Exportação PDF para o pediatra
- [ ] Gráfico de percentis de temperatura
- [ ] PWA (offline support)
- [ ] Partilha de acesso entre pais/cuidadores

---

## 📄 Licença

MIT
