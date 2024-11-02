import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Ingresar.css';
import Modal from './Modal';

const Ingresar = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricpcion: '',
    completada: '',
    fecha_creacion: '',
    prioridad: '',
    asignado_a: '',
    categorias: '',
    costo_proyecto: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'completada' ? (value === 'si') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://examenfinalback.onrender.com/api/proyecto';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Datos enviados correctamente. El ID del registro es: ${data.proyecto.id}`);
        setShowModal(true);
        setFormData({
          titulo: '',
          descricpcion: '',
          completada: '', // Se restablece a "Elija una opción"
          fecha_creacion: '',
          prioridad: '', // Restaura a la opción predeterminada "Elija una opción"
          asignado_a: '',
          categorias: '', // Restaura a la opción predeterminada "Elija una opción"
          costo_proyecto: '',
        });
      } else {
        const errorData = await response.json();
        console.log('Error al enviar los datos:', errorData);
        setMensaje('Error al enviar los datos.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Ocurrió un error al enviar los datos:', error);
      setMensaje('Ocurrió un error al enviar los datos.');
      setShowModal(true);
    }
  };

  const handleRedirect = (ruta) => {
    navigate(ruta);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registro de Proyectos UMG 2024 :D </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="descricpcion">Descripción:</label>
          <input
            type="text"
            id="descricpcion"
            name="descricpcion"
            value={formData.descricpcion}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="completada">Completada:</label>
          <select
            id="completada"
            name="completada"
            value={formData.completada === '' ? '' : (formData.completada ? 'si' : 'no')}
            onChange={handleChange}
            required
          >
            <option value="">Elija una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="fecha_creacion">Fecha de Creación:</label>
          <input
            type="date"
            id="fecha_creacion"
            name="fecha_creacion"
            value={formData.fecha_creacion}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="prioridad">Prioridad:</label>
          <select
            id="prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            required
          >
            <option value="">Elija una opción</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div>
          <label htmlFor="asignado_a">Asignado a:</label>
          <input
            type="text"
            id="asignado_a"
            name="asignado_a"
            value={formData.asignado_a}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="categorias">Categorías:</label>
          <select
            id="categorias"
            name="categorias"
            value={formData.categorias}
            onChange={handleChange}
            required
          >
            <option value="">Elija una opción</option>
            <option value="implementacion_funcionalidad">Implementación de Funcionalidad</option>
            <option value="correccion_errores">Corrección de Errores</option>
            <option value="optimizacion_codigo">Optimización de Código</option>
            <option value="documentacion">Documentación</option>
            <option value="testing">Testing</option>
          </select>
        </div>

        <div>
          <label htmlFor="costo_proyecto">Costo del Proyecto:</label>
          <input
            type="number"
            id="costo_proyecto"
            name="costo_proyecto"
            value={formData.costo_proyecto}
            onChange={handleChange}
          />
        </div>

        <div className="button-container">
          <button type="submit" className="enviar">Enviar</button>
          <button type="button" className="actualizar" onClick={() => handleRedirect('/UsuarioA')}>Actualizar</button>
          <button type="button" className="buscar" onClick={() => handleRedirect('/UsuarioB')}>Buscar</button>
          <button type="button" className="eliminar" onClick={() => handleRedirect('/UsuarioE')}>Eliminar</button>
        </div>
      </form>

      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default Ingresar;
