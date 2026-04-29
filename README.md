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
cd backend
```

Configure o banco de dados no arquivo `application.properties`.

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

Exemplo de configuração no backend:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/financees
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

jwt.secret=sua_chave_secreta
```

---

## 📸 Demonstração

> Adicione aqui prints ou GIFs do sistema (login, dashboard, funcionalidades).

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
