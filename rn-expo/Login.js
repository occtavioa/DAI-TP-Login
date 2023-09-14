import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [respuesta, setRespuesta] = useState();

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
          axios.post("http://localhost:5000/login", {
            username: nombre,
            password: contraseña
          }, {
            validateStatus: false,
          })
            .then((response) => {
              console.log(response);
              if(response.status === 200) {
                navigation.navigate("Home", {id: response.data.Id})
              } else {
                setRespuesta("usuario invalido")
              }
            })
            .catch((error) => {
              console.error(error);
              setRespuesta(error.message)
            })
        }}
      >
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => {
        navigation.navigate("Register")
      }}>
        <Text>No tengo cuenta</Text>
      </Pressable>
      {respuesta && <Text>{respuesta}</Text>}
    </View>
  );
}
