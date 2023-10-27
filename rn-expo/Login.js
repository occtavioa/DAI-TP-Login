import { Link } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./fbcontext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respuesta, setResupesta] = useState()

  return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
      {
        respuesta &&
          <Text style={styles.errorMessage}>{respuesta}</Text>
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
          const auth = getAuth(app);
          try {
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate("Home", {id: user.uid})
          } catch(e) {
            console.error(e);
            setResupesta("Error")
          }
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
