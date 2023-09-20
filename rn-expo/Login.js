import axios from "axios";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [respuesta, setRespuesta] = useState();

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
          axios.post("http://localhost:5000/login", {
            username: nombre,
            password: contraseña
          }, {
            validateStatus: false,
          })
            .then((response) => {
              console.log(response);
              if(response.status === 200) {
                navigation.navigate("Home", {id: response.data.Id})
              } else {
                setRespuesta("usuario invalido")
              }
            })
            .catch((error) => {
              console.error(error);
              setRespuesta(error.message)
            })
        }}
        style={styles.pressable}
      >
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => {
        navigation.navigate("Register")
      }}
        style={styles.pressable}
      >
        <Text>No tengo cuenta</Text>
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
