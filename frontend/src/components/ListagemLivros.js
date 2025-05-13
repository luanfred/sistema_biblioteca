import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListagemLivros.css';

function ListagemLivros() {
    const [livros, setLivros] = useState([]);
    const [filtroAutor, setFiltroAutor] = useState('');
    const [filtroAno, setFiltroAno] = useState('');
    const [erro, setErro] = useState('');
    const [livroEditando, setLivroEditando] = useState(null);

    useEffect(() => {
        carregarLivros();
    }, []);

    const carregarLivros = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/livros');
            setLivros(response.data);
            setErro('');
        } catch (erro) {
            setErro('Erro ao carregar livros');
        }
    };

    const filtrarPorAutor = async () => {
        if (!filtroAutor) {
            carregarLivros();
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/api/livros/autor/${filtroAutor}`);
            setLivros(response.data);
            setErro('');
        } catch (erro) {
            setErro('Erro ao filtrar por autor');
        }
    };

    const filtrarPorAno = async () => {
        if (!filtroAno) {
            carregarLivros();
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/api/livros/ano/${filtroAno}`);
            setLivros(response.data);
            setErro('');
        } catch (erro) {
            setErro('Erro ao filtrar por ano');
        }
    };

    const handleEditar = (livro) => {
        setLivroEditando(livro);
    };

    const handleSalvarEdicao = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/livros/${livroEditando.id}`, livroEditando);
            setLivroEditando(null);
            carregarLivros();
            setErro('');
        } catch (erro) {
            setErro(erro.response?.data?.erro || 'Erro ao atualizar livro');
        }
    };

    const handleCancelarEdicao = () => {
        setLivroEditando(null);
    };

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este livro?')) {
            try {
                await axios.delete(`http://localhost:3001/api/livros/${id}`);
                carregarLivros();
                setErro('');
            } catch (erro) {
                setErro('Erro ao excluir livro');
            }
        }
    };

    const handleChangeEdicao = (e) => {
        const { name, value } = e.target;
        setLivroEditando(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="listagem-container">
            <h2>Listagem de Livros</h2>
            
            <div className="filtros">
                <div className="filtro-grupo">
                    <input
                        type="text"
                        placeholder="Filtrar por autor"
                        value={filtroAutor}
                        onChange={(e) => setFiltroAutor(e.target.value)}
                    />
                    <button onClick={filtrarPorAutor}>Filtrar por Autor</button>
                </div>
                
                <div className="filtro-grupo">
                    <input
                        type="number"
                        placeholder="Filtrar por ano"
                        value={filtroAno}
                        onChange={(e) => setFiltroAno(e.target.value)}
                        min="1900"
                    />
                    <button onClick={filtrarPorAno}>Filtrar por Ano</button>
                </div>
            </div>

            {erro && <div className="erro">{erro}</div>}

            <div className="livros-grid">
                {livros.map(livro => (
                    <div key={livro.id} className="livro-card">
                        {livroEditando?.id === livro.id ? (
                            <form onSubmit={handleSalvarEdicao} className="form-edicao">
                                <input
                                    type="text"
                                    name="titulo"
                                    value={livroEditando.titulo}
                                    onChange={handleChangeEdicao}
                                    required
                                />
                                <input
                                    type="text"
                                    name="autor"
                                    value={livroEditando.autor}
                                    onChange={handleChangeEdicao}
                                    required
                                />
                                <input
                                    type="number"
                                    name="anoPublicacao"
                                    value={livroEditando.anoPublicacao}
                                    onChange={handleChangeEdicao}
                                    min="1900"
                                    required
                                />
                                <div className="botoes-edicao">
                                    <button type="submit">Salvar</button>
                                    <button type="button" onClick={handleCancelarEdicao}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h3>{livro.titulo}</h3>
                                <p><strong>Autor:</strong> {livro.autor}</p>
                                <p><strong>Ano:</strong> {livro.anoPublicacao}</p>
                                <div className="botoes-acoes">
                                    <button onClick={() => handleEditar(livro)}>Editar</button>
                                    <button onClick={() => handleExcluir(livro.id)} className="botao-excluir">Excluir</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListagemLivros; 