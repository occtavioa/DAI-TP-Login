import { Link } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

export default function Register({ navigation }) {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [id, setId] = useState(null)
  const [respuesta, setRespuesta] = useState()

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>

      {
        respuesta ?
          respuesta === 204 ?
            <Text style={styles.successMessage}>Usuario creado</Text> :
            <Text style={styles.errorMessage}>
              {
                respuesta === 400 ?
                  <>Usuario invalido</> :
                  <>Error de red</>
              }
            </Text> :
          <></>
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
          }, {
            validateStatus: false
          })
            .then((response) => {
              setRespuesta(response.status)
            })
            .catch((error) => {
              console.error(error);
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
