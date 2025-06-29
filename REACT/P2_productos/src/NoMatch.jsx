import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function NoMatch() {
  const navigate = useNavigate();

  // Función para manejar el botón "Volver" y redirigir a la página principal
  const handleBack = () => {
    navigate('/');  // Navegar de vuelta a la página principal
  };

  return (
    <div>
      <h2 id="info">Ruta no encontrada</h2>
      <Button id="volver" onClick={handleBack}>
        Volver
      </Button>
    </div>
  );
}
