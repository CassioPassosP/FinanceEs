# 📊 FinanceEs

Sistema web de **gestão financeira pessoal**, desenvolvido como projeto acadêmico, com o objetivo de ajudar usuários a controlarem **receitas, despesas e metas financeiras** de forma simples e intuitiva.

---

## 🚀 Funcionalidades

* ✅ Cadastro e login de usuários (autenticação)
* 💰 Registro de receitas e despesas
* 📅 Organização por datas
* 🎯 Criação e acompanhamento de metas financeiras
* 📊 Visualização de saldo atual
* 🔐 Proteção de rotas com autenticação

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend

* React
* JavaScript
* HTML5 & CSS3

### ⚙️ Backend

* Java + Spring Boot
* JPA / Hibernate

### 🗄️ Banco de Dados

* PostgreSQL

### 🔧 Ferramentas

* Git & GitHub
* Postman (testes de API)

---

## 📂 Estrutura do Projeto

```bash
FinanceEs/
├── backend/        # API REST (Spring Boot)
├── frontend/       # Interface do usuário (React)
└── README.md
```

---

## ⚙️ Como Executar o Projeto

### 🔧 Backend

```bash
cd backend-spring/finance-api
```

Copie `.env.example` para `.env` na raiz do repositório e configure as variáveis do banco e do JWT. O backend carrega esse arquivo ao iniciar.

Execute o projeto:

```bash
./mvnw spring-boot:run
```

ou rode diretamente pela sua IDE.

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Variáveis de Ambiente

Exemplo de configuração no arquivo `.env` (na raiz do repositório):

```dotenv
DB_URL=jdbc:postgresql://localhost:5432/financees
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta
JWT_EXPIRATION=86400000
```

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte da disciplina de **Projeto Final**, com foco na construção de um sistema completo utilizando boas práticas de desenvolvimento:

* Arquitetura em camadas
* Autenticação com JWT
* Integração entre frontend e backend
* Persistência de dados

---

## 📌 Status do Projeto

🚧 Em desenvolvimento *(protótipo funcional)*

---

## 👨‍💻 Autor

**Cassio Passos**
🎓 Estudante de Análise e Desenvolvimento de Sistemas
💻 Em transição para Desenvolvedor Full Stack

---

## 📄 Licença

Este projeto é de uso acadêmico.
