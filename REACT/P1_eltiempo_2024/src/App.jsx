import { useState } from "react";
import "./App.css";
import Header from "./Header";
import CONFIG from "./config/config";
import Resultados from "./Resultados";
import {mock1} from "./constants/mock";


function App() {
  const [latitud, setLatitud] = useState(CONFIG.default_lat);
  const [longitud, setLongitud] = useState(CONFIG.default_lon);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);


  const callServer = async () => {
    if (CONFIG.use_server) {   
      try {
      const response = await fetch(`${CONFIG.server_url}/v1/forecast.json?key=${CONFIG.api_key}&q=${latitud},${longitud}&days=${CONFIG.num_items_query}`);

        // Verificamos si la respuesta es 200 OK
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(`Error ${errorData.error.code}: ${errorData.error.message}.`)
        } else {
          const data = await response.json();
          // Procesamos los datos del servidor
          setResultado(data);
          setError(null);
        }
         
    } catch(error) {
      setError(error.message);
      setResultado(null);
    }
      
    } else {
      setResultado(mock1);
    }
  }
  
  return (
    <div id="main">
      <Header />
      <h2 id="titulo">El tiempo</h2>
      <div>
        <h3>Latitud:</h3>
        <input
          type="number"
          id="latitud"
          value={latitud}
          onChange={(e) => setLatitud(e.target.value)}
        />
        <h3>Longitud:</h3>
        <input
          type="number"
          id="longitud"
          value={longitud}
          onChange={(e) => setLongitud(e.target.value)}
        /> 
        <br></br>
        <button id="buscar" onClick={callServer} >
          Buscar
        </button>
        {error && <div id="error"> Error: {error}</div>}
        {resultado && <Resultados numitems={CONFIG.num_items_show} datos={resultado} />}
      </div>
    </div>
  );
}

export default App;
