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
        onPress={() => {
          axios
            .post("http://localhost:5000/login", {
              name: nombre,
              password: contraseña,
            })
            .then((r) => {
              setRespuesta(r.data);
            })
            .catch(() => {
              setRespuesta("error");
            });
        }}
      >
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => {
        navigation.navigate("Registro")
      }}>
        <Text>No tengo cuenta</Text>
      </Pressable>
      {respuesta && <Text>{respuesta}</Text>}
    </View>
  );
}
