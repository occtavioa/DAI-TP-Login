import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Register({ navigation }) {
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
        onPress={async () => {
          axios.post("http://localhost:5000/register", {
            name: nombre,
            password: contraseña
          }, {
            validateStatus: false,
          })
            .then((response) => {
              if(response.status === 201) {
                setRespuesta("usuario creado")
              } else {
                setRespuesta("usuario invalido")
              }
            })
            .catch((error) => {
              console.error(error);
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
