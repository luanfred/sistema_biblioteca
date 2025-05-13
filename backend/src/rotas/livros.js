const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Rotas para livros
router.post('/', livroController.criarLivro);
router.get('/', livroController.listarLivros);
router.get('/autor/:autor', livroController.buscarPorAutor);
router.get('/ano/:ano', livroController.buscarPorAno);
router.put('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.excluirLivro);

module.exports = router;