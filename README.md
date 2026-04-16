# 🏆 II Festival Família Fanfarrões

<div align="center">
  <img src="public/logo.png" alt="Logo Fanfarrões" width="200" />
  <p><em>Sistema oficial de gestão e acompanhamento do II Festival Família Fanfarrões Futebol Society.</em></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  </p>
</div>

---

## 📱 O Projeto

Um web app **mobile-first** desenvolvido para proporcionar a melhor experiência aos atletas e organizadores do festival. O sistema permite acompanhar horários de jogos, consultar o regulamento, visualizar escalações táticas e gerenciar pagamentos.

### ✨ Funcionalidades Principais

#### Para Atletas:

- 📅 **Horários em Tempo Real**: Visualize a grade de jogos atualizada.
- 📋 **Escalações Táticas**: Veja os times no campo (6 titulares e 4 reservas).
- 📜 **Regulamento**: Acesso rápido às regras do festival.
- 💸 **Pagamentos**: Informações para PIX e status de confirmação por equipe.

#### Para Organizadores (Área Admin):

- 🔐 **Painel Protegido**: Acesso via senha para gestão total.
- 🛠️ **Gestão de Jogos**: Crie, edite e exclua partidas da tabela.
- 👥 **Gestão de Equipes**: Controle total sobre inscritos e jogadores.
- 💰 **Controle Financeiro**: Atualize o status de pagamento (Pendente, Parcial ou Pago).

---

## 🎨 Identidade Visual

| Elemento           | Valor     | Amostra                                                  |
| :----------------- | :-------- | :------------------------------------------------------- |
| **Azul Principal** | `#0080cc` | ![](https://via.placeholder.com/15/0080cc/0080cc?text=+) |
| **Fundo Dark**     | `#0d0f11` | ![](https://via.placeholder.com/15/0d0f11/0d0f11?text=+) |

---

## 🚀 Como Rodar Localmente

### 1️⃣ Preparação

```bash
# Clone o repositório
git clone https://github.com/Mathdino/festival-familia-fanfarroes.git

# Entre na pasta
cd festival-familia-fanfarroes

# Instale as dependências
npm install
```

### 2️⃣ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/neondb"
NEXTAUTH_SECRET="sua_chave_secreta_aqui"
ADMIN_PASSWORD="fanfarroes2026"
```

### 3️⃣ Banco de Dados

```bash
# Sincronize o schema
npx prisma db push

# (Opcional) Popule com dados iniciais
npx prisma db seed
```

### 4️⃣ Iniciar

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) 🚀

---

## 📁 Estrutura do Projeto

```text
fanfarroes/
├── app/               # Rotas e API (Next.js App Router)
├── components/        # Componentes UI e Telas (HomeScreen, Lineups, etc)
├── lib/               # Utilitários e Cliente Prisma
├── prisma/            # Schema e Scripts de Banco de Dados
└── public/            # Ativos estáticos (Logo, Ícones)
```

---

## 🛠️ Stack Tecnológica

- **Frontend**: [Next.js 14](https://nextjs.org/) (React)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

<div align="center">
  <p>Desenvolvido para a Família Fanfarrões</p>
  <p><strong>Matheus Bernardino 🏆</strong></p>
</div>
