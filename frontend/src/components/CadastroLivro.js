import React, { useState } from 'react';
import axios from 'axios';
import './CadastroLivro.css';

function CadastroLivro() {
    const [livro, setLivro] = useState({
        titulo: '',
        autor: '',
        anoPublicacao: ''
    });
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/livros', {
                ...livro,
                anoPublicacao: parseInt(livro.anoPublicacao)
            });
            setMensagem('Livro cadastrado com sucesso!');
            setLivro({ titulo: '', autor: '', anoPublicacao: '' });
        } catch (erro) {
            setMensagem(erro.response?.data?.erro || 'Erro ao cadastrar livro');
        }
    };

    return (
        <div className="cadastro-container">
            <h2>Cadastrar Novo Livro</h2>
            {mensagem && <div className="mensagem">{mensagem}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={livro.titulo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="autor">Autor:</label>
                    <input
                        type="text"
                        id="autor"
                        name="autor"
                        value={livro.autor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="anoPublicacao">Ano de Publicação:</label>
                    <input
                        type="number"
                        id="anoPublicacao"
                        name="anoPublicacao"
                        value={livro.anoPublicacao}
                        onChange={handleChange}
                        min="1900"
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroLivro; 