import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/actualizar.css'; // Importa el archivo CSS
import Modal from './Modal'; // Importa el componente modal

const Actualizar = () => {
  const [formData, setFormData] = useState({
    id: '', // Campo para el ID del proyecto a modificar
    titulo: '',
    descricpcion: '',
    completada: '', // Lista desplegable con "Elija una opción"
    fecha_creacion: '',
    prioridad: '',
    asignado_a: '',
    categorias: '',
    costo_proyecto: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'completada' ? (value === 'si') : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `https://examenfinalback.onrender.com/api/proyectos/${formData.id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje(`Proyecto con ID ${formData.id} actualizado correctamente.`);
        setShowModal(true); // Mostrar el modal al finalizar la actualización
        setFormData({
          id: '',
          titulo: '',
          descricpcion: '',
          completada: '', // Resetea a "Elija una opción"
          fecha_creacion: '',
          prioridad: '', // Resetea a "Elija una opción"
          asignado_a: '',
          categorias: '', // Resetea a "Elija una opción"
          costo_proyecto: '',
        });
      } else {
        setMensaje('Error al actualizar los datos.');
        setShowModal(true); // Mostrar el modal con el mensaje de error
      }
    } catch (error) {
      setMensaje('Ocurrió un error al actualizar los datos.');
      setShowModal(true); // Mostrar el modal con el mensaje de error
    }
  };

  const handleRegresar = () => {
    navigate('/'); // Redirige a la página principal o la ruta que prefieras
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Actualizar Informacion Del Proyecto</h2>

      <form onSubmit={handleSubmit}>
        {/* Campo para el ID del proyecto */}
        <div>
          <label htmlFor="id">ID del Proyecto:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Ingrese el ID del proyecto que desea actualizar"
            required
          />
        </div>

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
            value={formData.completada === true ? 'si' : formData.completada === false ? 'no' : ''}
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

        {/* Botones */}
        <div className="button-container">
          <button type="submit" className="actualizar">Actualizar</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>
      </form>

      {/* Modal para mostrar el mensaje */}
      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default Actualizar;
