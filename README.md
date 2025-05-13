# Sistema de Biblioteca

Sistema de controle de livros de biblioteca com arquitetura em camadas.

## Tecnologias Utilizadas

- Frontend: React.js
- Backend: Node.js com Express
- Banco de Dados: SQLite

## Requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### Frontend

1. Em um novo terminal, navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## Funcionalidades

- Cadastro de livros com validações
- Listagem de todos os livros
- Filtro por autor
- Filtro por ano de publicação

## Validações

- Título do livro deve ser único
- Ano de publicação deve ser maior que 1900
- Todos os campos são obrigatórios

## Estrutura do Projeto

### Backend
- `src/`
  - `controllers/` - Controladores da aplicação
  - `services/` - Lógica de negócios
  - `repositories/` - Acesso ao banco de dados
  - `config/` - Configurações do banco de dados
  - `rotas/` - Definição das rotas da API

### Frontend
- `src/`
  - `components/` - Componentes React
  - `App.js` - Componente principal
  - `App.css` - Estilos globais 