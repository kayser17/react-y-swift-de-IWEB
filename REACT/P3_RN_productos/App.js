import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage'; 
import { mockdata } from './components/constants/products';
import CONFIG from './components/config/config';

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {() => (
            <View style={styles.container}>
              {loading ? (
                <Image
                  testID="loading"
                  source={require('./assets/spinner.gif')}
                  style={styles.loadingImage}
                />
              ) : (
                <>
                  <Header />
                  <SearchPage theproducts={products.products} />
                </>
              )}
            </View>
          )}
        </Stack.Screen>

        {/* Pantalla de detalles del producto */}
        <Stack.Screen 
          name="ProductPage" 
          component={ProductPage} 
          options={{ title: 'Detalles del Producto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
});

