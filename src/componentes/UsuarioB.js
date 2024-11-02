import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/buscar.css';
import Modal from './Modal';

const BuscarUsuario = () => {
  const [id, setId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleBuscarUsuario = async (e) => {
    e.preventDefault();

    if (!id) {
      setMensaje('Por favor, ingrese un ID válido.');
      setShowModal(true);
      return;
    }

    setProyectos([]); // Limpiar la lista de proyectos antes de buscar un proyecto específico
    const apiUrl = `https://examenfinalback.onrender.com/api/proyectos/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setUsuario(data.proyecto);
        setMensaje('');
        setShowModal(false);
      } else {
        setMensaje('Proyecto no encontrado. Verifique el ID.');
        setUsuario(null);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al buscar el proyecto.');
      setUsuario(null);
      setShowModal(true);
    }

    setId(''); // Limpiar el campo de entrada de ID después de buscar
  };

  const handleVerProyectos = async () => {
    const apiUrl = 'https://examenfinalback.onrender.com/api/proyectos';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setProyectos(data.proyectos);
        setUsuario(null);
        setMensaje('');
        setShowModal(false);
      } else {
        setMensaje('No se encontraron proyectos.');
        setProyectos([]);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al buscar los proyectos.');
      setProyectos([]);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRegresar = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Buscar Proyecto</h2>
      
      <form onSubmit={handleBuscarUsuario}>
        <div>
          <label htmlFor="id">ID del Proyecto:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={handleChange}
            required
            placeholder="Ingrese el ID del proyecto"
          />
        </div>

        <div className="button-container">
          <button type="submit" className="buscar">Buscar Proyecto</button>
          <button type="button" onClick={handleVerProyectos} className="ver-proyecto">Ver Todos los Proyectos</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>
      </form>

      {usuario && (
        <div>
          <h3>Datos del Proyecto</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Completada</th>
                <th>Fecha Creación</th>
                <th>Prioridad</th>
                <th>Asignado a</th>
                <th>Categorías</th>
                <th>Costo Proyecto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.id}</td>
                <td>{usuario.titulo}</td>
                <td>{usuario.descricpcion}</td>
                <td>{usuario.completada ? 'Sí' : 'No'}</td>
                <td>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                <td>{usuario.prioridad}</td>
                <td>{usuario.asignado_a}</td>
                <td>{usuario.categorias}</td>
                <td>{usuario.costo_proyecto}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {proyectos.length > 0 && (
        <div>
          <h3>Lista de Proyectos</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Completada</th>
                <th>Fecha Creación</th>
                <th>Prioridad</th>
                <th>Asignado a</th>
                <th>Categorías</th>
                <th>Costo Proyecto</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>{proyecto.id}</td>
                  <td>{proyecto.titulo}</td>
                  <td>{proyecto.descricpcion}</td>
                  <td>{proyecto.completada ? 'Sí' : 'No'}</td>
                  <td>{new Date(proyecto.fecha_creacion).toLocaleDateString()}</td>
                  <td>{proyecto.prioridad}</td>
                  <td>{proyecto.asignado_a}</td>
                  <td>{proyecto.categorias}</td>
                  <td>{proyecto.costo_proyecto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default BuscarUsuario;
