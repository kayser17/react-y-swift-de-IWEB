import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import Location from './Location';  

export default function SearchPage({ theproducts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(theproducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams(); 
  // Hook para manejar los parámetros de la URL
  const navigate = useNavigate();  // Hook para realizar la navegación

  // Función para manejar el cambio en el input de búsqueda
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Función para filtrar productos según la categoría y el término de búsqueda
  const filterProducts = (category, searchTerm) => {
    const filtered = theproducts.filter((producto) => {
      const matchesCategory = category === "All" || producto.category === category;
      const matchesSearch = producto.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  };
  // Filtrar automáticamente al cambiar la categoría
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
   // Actualizar el parámetro 'category' en la URL
    if (newCategory === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", newCategory);
    }
    setSearchParams(searchParams);
    // Filtrar productos según la nueva categoría
    filterProducts(newCategory, searchTerm);
  };
  // Sincronizar el selector con el parámetro 'category' de la URL al cargar el componente
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "All";
    setSelectedCategory(categoryFromUrl);
    filterProducts(categoryFromUrl, searchTerm);
  }, [searchParams]);
  // Función para navegar a la página del producto
  const handleViewProduct = (id) => {
    navigate(`/products/${id}`);//Navegar a /products/:productId donde productId es la posición
  };
  // Obtener categorías únicas usando reduce
  const categories = theproducts.reduce((acc, product) => {
    //console.log("Categorias",theproducts);
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);
  return (
    <div>
      <Location /> {/* Renderizar el componente Location */}
      <h2 id="catálogo">Catálogo</h2>
      <input 
        id="filtro" 
        type="text" 
        placeholder="Buscar producto..." 
        value={searchTerm}
        onChange={handleInputChange} // Solo actualiza el valor del input
      />
      <Form.Select id="selector" value={selectedCategory} onChange={handleCategoryChange} className="mb-3">
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
      <button id="buscador" onClick={() => filterProducts(selectedCategory, searchTerm)}>Buscar</button>
      <Row id="productosresultados">
        {filteredProducts.map((producto, index) => (
            <Col key={producto.id} md={3} className="mb-4 unproducto">
              <Card className="h-100">
                <Card.Img variant="top" src={producto.thumbnail} alt={producto.title} />
                <Card.Body>
                  <Card.Title>{producto.title}</Card.Title>
                  <Card.Text>{producto.description}</Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => handleViewProduct(producto.id)}  
                  >
                    Ver
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}
