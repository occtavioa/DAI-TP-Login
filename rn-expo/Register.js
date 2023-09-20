import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

export default function Register({ navigation }) {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [respuesta, setRespuesta] = useState()

  return (
    <View style={{justifyContent: "center", alignItems: "center", height: "100%"}}>
      <View style={styles.textFieldsContainer}>
        <TextInput
          placeholder="nombre"
          onChangeText={(n) => {
            setNombre(n);
          }}
          style={styles.textField}
        ></TextInput>
        <TextInput
          placeholder="contraseña"
          onChangeText={(c) => {
            setContraseña(c);
          }}
          style={styles.textField}
        ></TextInput>
      </View>
      <Pressable
        onPress={async () => {
          axios.post("http://localhost:5000/register", {
            username: nombre,
            password: contraseña
          }, {
            validateStatus: false
          })
            .then((response) => {
              if(response.status === 204) {
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
        style={styles.pressable}
      >
        <Text>Registrarse</Text>
      </Pressable>
      {respuesta && <Text>{respuesta}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "green",
    padding: ".5%",
    borderRadius: "5px",
    margin: ".1%"
  },
  textField: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "grey",
    borderRadius: "5px",
    margin: ".1%"
  },
  textFieldsContainer: {
    margin: "1%",
  }
})

