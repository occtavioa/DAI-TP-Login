import { Link } from "@react-navigation/native";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { auth } from "./fbcontext";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [respuesta, setRespuesta] = useState()

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>

      {
        respuesta &&
          <Text style={respuesta === "Usuario creado" ? styles.successMessage : styles.errorMessage}>{respuesta}</Text>
      }

      <View style={styles.textFieldsContainer}>
        <TextInput
          placeholder="email"
          onChangeText={(n) => {
            setEmail(n);
          }}
          style={styles.textField}
        ></TextInput>
        <TextInput
          placeholder="contraseña"
          onChangeText={(c) => {
            setPassword(c);
          }}
          secureTextEntry={true}
          style={styles.textField}
        ></TextInput>
      </View>
      <Pressable
        onPress={async () => {
          createUserWithEmailAndPassword(auth, email, password)
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
