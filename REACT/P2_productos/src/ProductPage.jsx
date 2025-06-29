import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Location from './Location';  

export default function ProductPage({ products }) {
  const { productId } = useParams();//Obtener el parámetro productId de la URL
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(productId));
  // Función para manejar el botón de "volver"
  const handleBack = () => {
    navigate('/');  // Navegar de vuelta a la página principal
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <Location />
      <h1 id="titulo">{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <Button id="volver" onClick={handleBack}>Volver</Button>
    </div>
  );
}
