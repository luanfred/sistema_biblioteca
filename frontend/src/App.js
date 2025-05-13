import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroLivro from './components/CadastroLivro';
import ListagemLivros from './components/ListagemLivros';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Sistema de Biblioteca</h1>
          <ul>
            <li><Link to="/">Listagem de Livros</Link></li>
            <li><Link to="/cadastro">Cadastrar Livro</Link></li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<ListagemLivros />} />
            <Route path="/cadastro" element={<CadastroLivro />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 