const db = require('../config/database');

const livroRepository = {
    // Criar um novo livro
    async criar(dadosLivro) {
        return new Promise((resolve, reject) => {
            const { titulo, autor, anoPublicacao } = dadosLivro;
            db.run(
                'INSERT INTO livros (titulo, autor, anoPublicacao) VALUES (?, ?, ?)',
                [titulo, autor, anoPublicacao],
                function(err) {
                    if (err) reject(err);
                    resolve({
                        id: this.lastID,
                        titulo,
                        autor,
                        anoPublicacao
                    });
                }
            );
        });
    },

    // Listar todos os livros
    async listarTodos() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM livros ORDER BY titulo', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // Buscar livro por título
    async buscarPorTitulo(titulo) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM livros WHERE titulo = ?', [titulo], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    // Buscar livro por ID
    async buscarPorId(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM livros WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    // Buscar livros por autor
    async buscarPorAutor(autor) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM livros WHERE autor LIKE ? ORDER BY titulo', [`%${autor}%`], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // Buscar livros por ano
    async buscarPorAno(ano) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM livros WHERE anoPublicacao = ? ORDER BY titulo', [ano], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // Atualizar livro
    async atualizar(id, dadosLivro) {
        return new Promise((resolve, reject) => {
            const { titulo, autor, anoPublicacao } = dadosLivro;
            db.run(
                'UPDATE livros SET titulo = ?, autor = ?, anoPublicacao = ? WHERE id = ?',
                [titulo, autor, anoPublicacao, id],
                function(err) {
                    if (err) reject(err);
                    resolve({
                        id,
                        titulo,
                        autor,
                        anoPublicacao
                    });
                }
            );
        });
    },

    // Excluir livro
    async excluir(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM livros WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve(this.changes > 0);
            });
        });
    }
};

module.exports = livroRepository;