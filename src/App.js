import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ingresar from './componentes/Ingresar';
import UsuarioA from './componentes/UsuarioA';
import UsuarioB from './componentes/UsuarioB';
import UsuarioE from './componentes/UsuarioE';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ingresar />} />
        <Route path="/usuarioA" element={<UsuarioA />} /> {/* Ruta para UsuarioA */}
        <Route path="/usuarioB" element={<UsuarioB />} /> {/* Ruta para UsuarioB */}
        <Route path="/usuarioE" element={<UsuarioE />} /> {/* Ruta para UsuarioE */}
      </Routes>
    </Router>
  );
}

export default App;
