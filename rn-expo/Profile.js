import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { ImageBackground } from "react-native-web";
import { auth, db } from "./fbcontext";

function Profile({ route }) {
  const [user, setUser] = useState(null);
  const [modifiedUser, setModifiedUser] = useState(null);
  const [readOnlyForm, setReadOnlyForm] = useState(true);
  const [response, setResponse] = useState(null);
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((ds) => {
        setUser(ds.data());
      })
      .catch((e) => {
        console.error(e);
      });
  }, [auth.currentUser.uid]);

  useEffect(() => {
    if (readOnlyForm) {
      setModifiedUser(user);
    }
  }, [readOnlyForm]);

  useEffect(() => {
    setModifiedUser(user);
  }, [user]);

  return (
    <ImageBackground
      source={require("./assets/background.png")}
      style={styles.background}
    >
      <View style={{ alignItems: "center" }}>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => {
              setReadOnlyForm(!readOnlyForm);
            }}
            style={[styles.pressable, { margin: "1%" }]}
          >
            <Text style={{ color: "white" }}>
              {readOnlyForm ? <>Editar</> : <>Visualizar</>}
            </Text>
          </Pressable>
          {response && (
            <Text
              style={
                response.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {response.message}
            </Text>
          )}
          {!readOnlyForm && (
            <Pressable
              onPress={async () => {
                try {
                  await setDoc(doc(db, "users", auth.currentUser.uid), modifiedUser);
                  setUser(modifiedUser);
                  setResponse({
                    type: "success",
                    message: "Usuario modificado",
                  });
                } catch (e) {
                  setResponse({ type: "error", message: "Error" });
                  console.error(e);
                }
              }}
              style={[styles.pressable, { margin: "1%" }]}
            >
              <Text style={{ color: "white" }}>Guardar cambios</Text>
            </Pressable>
          )}
        </View>
        {modifiedUser && (
          <View style={styles.textFieldsContainer}>
            <View style={styles.formField}>
              <Text style={{ color: "white" }}>Email</Text>
              <TextInput
                readOnly={true}
                value={modifiedUser.email}
                style={styles.textField}
              />
            </View>
            <View style={styles.formField}>
              <Text style={{ color: "white" }}>Contraseña</Text>
              <TextInput
                readOnly={true}
                value={modifiedUser.password}
                secureTextEntry={securePasswordEntry}
                style={styles.textField}
              />
              <Pressable
                onPressIn={() => {
                  setSecurePasswordEntry(false);
                }}
                onPressOut={() => {
                  setSecurePasswordEntry(true);
                }}
              >
                <Text style={{ color: "white" }}>Mostrar</Text>
              </Pressable>
            </View>
            <View style={styles.formField}>
              <Text style={{ color: "white" }}>Nombre</Text>
              <TextInput
                style={styles.textField}
                value={modifiedUser.name ? modifiedUser.name : ""}
                readOnly={readOnlyForm}
                onChangeText={(t) => {
                  setModifiedUser({ ...modifiedUser, name: t });
                }}
              />
            </View>
            <View style={styles.formField}>
              <Text style={{ color: "white" }}>Apellido</Text>
              <TextInput
                style={styles.textField}
                value={modifiedUser.surname ? modifiedUser.surname : ""}
                readOnly={readOnlyForm}
                onChangeText={(t) => {
                  setModifiedUser({ ...modifiedUser, surname: t });
                }}
              />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
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
    margin: "1%",
  },
  buttonsContainer: {
    margin: "1%",
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
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  formField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Profile;
