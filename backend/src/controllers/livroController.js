const livroService = require('../services/livroService');

const livroController = {
    // Criar um novo livro
    async criarLivro(req, res) {
        try {
            const { titulo, autor, anoPublicacao } = req.body;
            
            // Validações
            if (!titulo || !autor || !anoPublicacao) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
            }

            if (anoPublicacao < 1900) {
                return res.status(400).json({ erro: 'O ano de publicação deve ser maior que 1900' });
            }

            const livro = await livroService.criarLivro({ titulo, autor, anoPublicacao });
            res.status(201).json(livro);
        } catch (erro) {
            if (erro.message === 'Título já existe') {
                return res.status(400).json({ erro: erro.message });
            }
            res.status(500).json({ erro: 'Erro ao criar livro' });
        }
    },

    // Listar todos os livros
    async listarLivros(req, res) {
        try {
            const livros = await livroService.listarLivros();
            res.json(livros);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao listar livros' });
        }
    },

    // Buscar livros por autor
    async buscarPorAutor(req, res) {
        try {
            const { autor } = req.params;
            const livros = await livroService.buscarPorAutor(autor);
            res.json(livros);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao buscar livros por autor' });
        }
    },

    // Buscar livros por ano
    async buscarPorAno(req, res) {
        try {
            const { ano } = req.params;
            const livros = await livroService.buscarPorAno(parseInt(ano));
            res.json(livros);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao buscar livros por ano' });
        }
    },

    // Atualizar livro
    async atualizarLivro(req, res) {
        try {
            const { id } = req.params;
            const { titulo, autor, anoPublicacao } = req.body;

            // Validações
            if (!titulo || !autor || !anoPublicacao) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
            }

            if (anoPublicacao < 1900) {
                return res.status(400).json({ erro: 'O ano de publicação deve ser maior que 1900' });
            }

            const livro = await livroService.atualizarLivro(id, { titulo, autor, anoPublicacao });
            if (!livro) {
                return res.status(404).json({ erro: 'Livro não encontrado' });
            }
            res.json(livro);
        } catch (erro) {
            if (erro.message === 'Título já existe') {
                return res.status(400).json({ erro: erro.message });
            }
            res.status(500).json({ erro: 'Erro ao atualizar livro' });
        }
    },

    // Excluir livro
    async excluirLivro(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await livroService.excluirLivro(id);
            if (!sucesso) {
                return res.status(404).json({ erro: 'Livro não encontrado' });
            }
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao excluir livro' });
        }
    }
};

module.exports = livroController; 