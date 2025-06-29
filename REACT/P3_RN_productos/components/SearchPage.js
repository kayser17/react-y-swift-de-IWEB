import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importamos el hook de navegación

export default function SearchPage({ theproducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(theproducts);
  
  let navigation;
  try{
    navigation = useNavigation();
  } catch {
    navigation=null;
  }


  const handleSearch = () => {
    const filtered = theproducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem} testID={`item_${item.id}`}>
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.productImage} 
        testID={`image_${item.id}`} 
      />
      <Text style={styles.productTitle} testID={`title_${item.id}`}>
        {item.title}
      </Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate('ProductPage', { product: item })} // Navegamos a la pantalla de detalles y pasamos el producto
        testID={`button_${item.id}`}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text testID="catalogo" style={styles.text}>
        Catálogo
      </Text>
      <TextInput
        testID="filtro"
        style={styles.input}
        placeholder="Buscar producto..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button
        testID="buscador"
        title="Buscar"
        onPress={handleSearch}
      />
      
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  list: {
    padding: 10,
  },
  productItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});
