import React from 'react';
import { View, Image, Text } from 'react-native';

export default function Header() {
  return (
    <View testID="cabecera" style={{ alignItems: 'center', marginTop: 20 }}>
      <Image
        testID="logo"
        source={require('../assets/logo-KayserWebs-favicon-04.png')}
        style={{ width: 100, height: 100 }}
      />
      <Text testID="mensaje" style={{ fontSize: 18, marginTop: 10 }}>
        Bienvenido a la página de Mariano Lorenzo Kayser
      </Text>
    </View>
  );
}
