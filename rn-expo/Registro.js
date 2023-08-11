import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Registro() {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [respuesta, setRespuesta] = useState()
  
  return (
    <View>
      <TextInput
        placeholder="nombre"
        onChangeText={(n) => {
          setNombre(n);
        }}
      ></TextInput>
      <TextInput
        placeholder="contraseña"
        onChangeText={(c) => {
          setContraseña(c);
        }}
      ></TextInput>
      <Pressable
        onPress={() => {
          axios
            .post("http://localhost:5000/registro", {
              nombre: nombre,
              contraseña: contraseña,
            })
            .then((r) => {
              setRespuesta(r.data);
            })
            .catch(() => {
              setRespuesta("error");
            });
        }}
      >
        <Text>Registrarse</Text>
      </Pressable>
      {respuesta && <Text>{respuesta}</Text>}
    </View>
  );
}
