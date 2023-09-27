import { Link } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [respuesta, setResupesta] = useState()

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
      {
        respuesta &&
        <Text style={styles.errorMessage}>{respuesta}</Text>
      }

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
          axios.post("http://localhost:5000/login", {
            username: nombre,
            password: contraseña
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                navigation.navigate("Home", { id: response.data.Id })
              } else {
                setResupesta("Error desconocido")
              }
            })
            .catch((error) => {
              if(error.response) {
                setResupesta(
                  error.response.status === 400 ?
                    "Credenciales invalidas" :
                    error.response.status === 404 ?
                      "Usuario no encontrado" :
                      error.response.status === 500 ?
                        "Error de servidor" :
                        "Error desconocido"
                )
              } else if (error.request) {
                setResupesta("Error de red")
              } else {
                setResupesta("Error desconocido")
              }
            })
        }}
        style={styles.pressable}
      >
        <Text>Login</Text>
      </Pressable>
      <Link to={{ screen: "Register" }} style={styles.pressable}>No tengo cuenta</Link>
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
  },
  errorMessage: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "red",
    borderRadius: "5px",
  }
})
