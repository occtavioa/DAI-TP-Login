import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [respuesta, setRespuesta] = useState();

  useEffect(() => {
    console.log(nombre);
  }, [nombre])

  useEffect(() => {
    console.log(contraseña);
  }, [contraseña])
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='nombre'
        onChangeText={n => {setNombre(n)}}
        ></TextInput>
      <TextInput
        placeholder='contraseña'
        onChangeText={c => {setContraseña(c)}}
      ></TextInput>
      <Button 
        onPress={(e) => {
          axios.post("http://localhost:5000/login", {
            nombre: nombre,
            contraseña: contraseña
          })
            .then(r => {
              setRespuesta(r.data)
            })
            .catch(() => {setRespuesta("error")})
        }}
        title="login"
      ></Button>
      {
        respuesta &&
          <Text>
            {respuesta}
          </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
