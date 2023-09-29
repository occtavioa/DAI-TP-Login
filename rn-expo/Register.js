import { Link } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

export default function Register({ navigation }) {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [respuesta, setRespuesta] = useState()

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>

      {
        respuesta &&
          <Text style={respuesta === "Usuario creado" ? styles.successMessage : styles.errorMessage}>{respuesta}</Text>
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
          axios.post("http://localhost:5000/register", {
            username: nombre,
            password: contraseña
          })
            .then((response) => {
              setRespuesta(
                response.status === 204 ?
                  "Usuario creado" :
                  "Error desconocido"
              )
            })
            .catch((error) => {
              console.error(error);
              if(error.response) {
                setRespuesta(
                  error.response.status === 400 ?
                    "Credenciales invalidas" :
                    error.response.status === 500 ?
                      "Error de servidor" :
                      "Error desconocido"
                )
              } else {
                setRespuesta("Error de red")
              }
            })
        }}
        style={styles.pressable}
      >
        <Text>Registrarse</Text>
      </Pressable>
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
  },
  successMessage: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "green",
    borderRadius: "5px",
  }
})
