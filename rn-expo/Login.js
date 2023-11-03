import { Link } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, ImageBackground } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./fbcontext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  noAccountLink: {
    color: "blue",
    margin: 10,
    fontStyle: "italic",
  },
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respuesta, setResupesta] = useState(null);

  return (
    <ImageBackground source={{ uri: 'https://images.pling.com/img/00/00/07/39/54/1047556/87818-1.png' }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textFieldsContainer}>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Text style={{color: "white"}}>Email</Text>
            <TextInput
              onChangeText={(n) => {
                setEmail(n);
              }}
              style={styles.textField}
            ></TextInput>
          </View>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Text style={{color: "white"}}>Contraseña</Text>
            <TextInput
              onChangeText={(c) => {
                setPassword(c);
              }}
              secureTextEntry={true}
              style={styles.textField}
            ></TextInput>
          </View>
        </View>
        {respuesta && <Text style={styles.errorMessage}>{respuesta}</Text>}
        <Pressable
          onPress={async () => {
            const auth = getAuth(app);
            try {
              const { user } = await signInWithEmailAndPassword(auth, email, password)
              navigation.navigate("Home", { id: user.uid })
            } catch (e) {
              console.error(e);
              setResupesta("Error")
            }
          }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Link to={{ screen: "Register" }} style={styles.noAccountLink}>
          No tengo cuenta
        </Link>
      </View>
    </ImageBackground>
  );
}
