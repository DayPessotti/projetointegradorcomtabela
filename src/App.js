import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EscolhaFuncionalidade from './pages/EscolhaFuncionalidade';
import Home from './pages/Home';
import CadastroUsuarios from './pages/CadastroUsuarios';
import CadastroProfessores from './pages/CadastroProfessores';
import AtribuicaoAulas from './pages/AtribuicaoAulas';
import RestaurarSenha from './pages/RestaurarSenha';


function App() {
  return (
    <Router>
      <div style={{ width: '100%', height: '100%' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastro-usuarios" element={<CadastroUsuarios />} />
          <Route path="/escolha-funcionalidade" element={<EscolhaFuncionalidade />} />
          <Route path="/cadastro-professores" element={<CadastroProfessores />} />
          <Route path="/atribuicao-aulas" element={<AtribuicaoAulas />} />
          <Route path="/restaurar-senha" element={<RestaurarSenha />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
