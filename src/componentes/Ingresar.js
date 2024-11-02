import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Ingresar.css'; // Importa el archivo CSS
import Modal from './Modal'; // Importa el componente modal

const Ingresar = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricpcion: '',
    completada: '', // Deja vacío para la opción predeterminada
    fecha_creacion: '',
    prioridad: '',
    asignado_a: '',
    categorias: '',
    costo_proyecto: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'completada' ? (value === 'si') : value, // Convertimos "si" y "no" a booleanos
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
        setShowModal(true); // Muestra el modal cuando los datos se envían correctamente
        setFormData({
          titulo: '',
          descricpcion: '',
          completada: '',
          fecha_creacion: '',
          prioridad: '',
          asignado_a: '',
          categorias: '',
          costo_proyecto: '',
        });
      } else {
        const errorData = await response.json(); // Obtener el error de la respuesta
        console.log('Error al enviar los datos:', errorData); // Ver el error en la consola para diagnóstico
        setMensaje('Error al enviar los datos.');
        setShowModal(true); // Muestra el modal en caso de error
      }
    } catch (error) {
      console.error('Ocurrió un error al enviar los datos:', error);
      setMensaje('Ocurrió un error al enviar los datos.');
      setShowModal(true); // Muestra el modal en caso de error
    }
  };

  const handleRedirect = (ruta) => {
    navigate(ruta);
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal cuando se presiona "Cerrar"
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
            value={formData.completada ? 'si' : 'no'}
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
            <option value="clasificacion">Clasificación</option>
            <option value="tipo de tarea">Tipo de tarea</option>
            <option value="opcional">Opcional</option>
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

      {/* Modal para mostrar el mensaje */}
      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default Ingresar;
