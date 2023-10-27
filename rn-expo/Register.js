import { Link } from "@react-navigation/native";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { app, auth, db } from "./fbcontext";
import { addDoc, doc, getFirestore, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [respuesta, setRespuesta] = useState(null)

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
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
          try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, "users", user.uid), {
              name: "",
              surname: "",
              email: email,
              password: password
            })
            setRespuesta("Usuario creado")
          } catch(e) {
            console.error(e);
            setRespuesta("Error")
          }
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
