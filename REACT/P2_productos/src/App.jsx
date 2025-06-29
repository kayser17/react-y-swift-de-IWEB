import { useState, useEffect } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CONFIG from "./config/config";
import Header from "./Header";
import SearchPage from "./SearchPage";
import ProductPage from "./ProductPage";
import NoMatch from "./NoMatch";
import {mockdata} from "./constants/products"
import { Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(mockdata.products);


  const download = async () => {
    if (CONFIG.use_server){
      try{
        const response = await fetch(CONFIG.server_url)
        const serverProducts = await response.json();
        setProducts(serverProducts);
      }catch(e){
        alert("No se ha podido recuperar la información.");
      }
    }else {
      setProducts(mockdata);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await download();
			setTimeout(()=>{
				setLoading(false);
			},500);		
    }

    fetchData();
  }, []);
  return (
    <div className="main">
      {loading ? <img src="/spinner.gif" className="spinner" id="loading" alt="spinner" />:(
      <div>
       <Routes>
            <Route path="/" element={<><Header /><SearchPage theproducts={products.products} /></>} />
            <Route path="/products/:productId" element={<ProductPage products={products.products} />} />  
            <Route path="*" element={<NoMatch />} />
          </Routes>
      </div>
      )}
    </div>
   
  )
}

export default App
