import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, ImageBackground, Alert } from "react-native";
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
  const [respuesta, setRespuesta] = useState(null);

  return (
    <ImageBackground source={{ uri: 'https://images.pling.com/img/00/00/07/39/54/1047556/87818-1.png' }} style={styles.background}>
      <View style={styles.container}>
        {respuesta && <Text style={respuesta === "Error" ? styles.errorMessage : styles.successMessage}>{respuesta}</Text>}
        <View style={styles.textFieldsContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(n) => {
              setEmail(n);
            }}
            style={styles.textField}
            placeholderTextColor="white"
          ></TextInput>
          <TextInput
            placeholder="Contraseña"
            onChangeText={(c) => {
              setPassword(c);
            }}
            secureTextEntry={true}
            style={styles.textField}
            placeholderTextColor="white"
          ></TextInput>
        </View>
        <Pressable
          onPress={async () => {
            try {
              const { user } = await createUserWithEmailAndPassword(auth, email, password);
              await setDoc(doc(db, "users", user.uid), {
                name: "",
                surname: "",
                email: email,
                password: password,
              });
              setRespuesta("Registrado con éxito");

            } catch (e) {
              console.error(e);
              setRespuesta("Error");
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
