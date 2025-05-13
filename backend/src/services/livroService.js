const livroRepository = require('../repositories/livroRepository');

const livroService = {
    // Criar um novo livro
    async criarLivro(dadosLivro) {
        const livroExistente = await livroRepository.buscarPorTitulo(dadosLivro.titulo);
        if (livroExistente) {
            throw new Error('Título já existe');
        }
        return await livroRepository.criar(dadosLivro);
    },

    // Listar todos os livros
    async listarLivros() {
        return await livroRepository.listarTodos();
    },

    // Buscar livros por autor
    async buscarPorAutor(autor) {
        return await livroRepository.buscarPorAutor(autor);
    },

    // Buscar livros por ano
    async buscarPorAno(ano) {
        return await livroRepository.buscarPorAno(ano);
    },

    // Atualizar livro
    async atualizarLivro(id, dadosLivro) {
        const livroExistente = await livroRepository.buscarPorId(id);
        if (!livroExistente) {
            return null;
        }

        // Verifica se o novo título já existe em outro livro
        if (dadosLivro.titulo !== livroExistente.titulo) {
            const livroComMesmoTitulo = await livroRepository.buscarPorTitulo(dadosLivro.titulo);
            if (livroComMesmoTitulo) {
                throw new Error('Título já existe');
            }
        }

        return await livroRepository.atualizar(id, dadosLivro);
    },

    // Excluir livro
    async excluirLivro(id) {
        const livroExistente = await livroRepository.buscarPorId(id);
        if (!livroExistente) {
            return false;
        }
        await livroRepository.excluir(id);
        return true;
    }
};

module.exports = livroService;