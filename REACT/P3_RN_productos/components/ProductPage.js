import React from 'react';
import { View, Text, Button, StyleSheet, Image} from 'react-native';

export default function ProductPage({ route, navigation }) {
  const { product } = route.params; // Recibimos los datos del producto desde la navegación

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: product.thumbnail }} 
        style={styles.productImage} 
        testID={`image_${product.id}`} 
      />
      <Text testID="detalle" style={styles.title}>
        {product.title}
      </Text>
      <Button
        testID="volver"
        title="Volver"
        onPress={() => navigation.goBack()} // Vuelve a la página anterior
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
