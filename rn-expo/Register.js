import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { auth, db } from "./fbcontext";
import { doc, setDoc } from "firebase/firestore";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  textField: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: "white",
  },
  textFieldsContainer: {
    margin: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    margin: 10,
    fontSize: 30,
    textAlign: "center",
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
  pressable: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  pressableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  return (
    <ImageBackground
      source={require("./assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {response && (
          <Text
            style={
              response === "Error" ? styles.errorMessage : styles.successMessage
            }
          >
            {response}
          </Text>
        )}
        <View style={styles.textFieldsContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Email</Text>
            <TextInput
              onChangeText={(e) => {
                setEmail(e);
              }}
              style={styles.textField}
            ></TextInput>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Contraseña</Text>
            <TextInput
              onChangeText={(c) => {
                setPassword(c);
              }}
              secureTextEntry={true}
              style={styles.textField}
            ></TextInput>
          </View>
        </View>
        <Pressable
          onPress={async () => {
            try {
              const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              await setDoc(doc(db, "users", user.uid), {
                name: "",
                surname: "",
                email: email,
                password: password,
              });
              setResponse("Registrado con éxito");
            } catch (e) {
              console.error(e);
              setResponse("Error");
            }
          }}
          style={styles.pressable}
        >
          <Text style={styles.pressableText}>Registrarse</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
