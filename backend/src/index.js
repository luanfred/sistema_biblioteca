const express = require('express');
const cors = require('cors');
const rotasLivros = require('./rotas/livros');

const app = express();
const porta = 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/livros', rotasLivros);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
}); 