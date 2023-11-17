import { Link } from "@react-navigation/native";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, FlatList, Modal } from "react-native";
import { ImageBackground } from "react-native-web";
import { auth, db } from "./fbcontext";

function Profile({ route }) {
  const tasksCollectionsRef = collection(db, "taskscollection")
  const [user, setUser] = useState();
  const [userDocRef, setUserDocRef] = useState()
  const [tasksCollections, setTasksCollections] = useState([])
  const [modifiedUser, setModifiedUser] = useState();
  const [readOnlyForm, setReadOnlyForm] = useState(true);
  const [response, setResponse] = useState();
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((ds) => {
        setUser(ds.data());
        setUserDocRef(ds.ref)
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

  useEffect(() => {
    if(typeof userDocRef !== "undefined") {
      const q = query(tasksCollectionsRef, where("idUser", "==", userDocRef))
      getDocs(q)
        .then((qs) => {
          setTasksCollections(qs.docs)
        })
        .catch((e) => {console.error(e);})
    }
  }, [userDocRef])

  useEffect(() => {
    console.log(tasksCollections);
  }, [tasksCollections])

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
          {typeof response !== "undefined" && (
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
                  await setDoc(userDocRef, modifiedUser);
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
        {typeof modifiedUser !== "undefined" && (
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
                value={typeof modifiedUser.name === "string" ? modifiedUser.name : ""}
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
                value={typeof modifiedUser.surname === "string" ? modifiedUser.surname : ""}
                readOnly={readOnlyForm}
                onChangeText={(t) => {
                  setModifiedUser({ ...modifiedUser, surname: t });
                }}
              />
            </View>
          </View>
        )}
        <Text style={{color: "white"}}>Mis colleciones</Text>
        <FlatList
          data={tasksCollections}
          renderItem={({item}) => <Link to={{screen: "Collection", params: {id: item.id}}} style={styles.taskCollection}>{item.data().name}</Link>}
        />
        <Pressable style={styles.pressable} onPress={() => {setModalVisible(true)}}>
          <Text style={{color: "white"}}>Agregar colleción</Text>
        </Pressable>
        <Modal visible={modalVisible}>
            <Pressable onPress={() => {setModalVisible(false)}}><Text>Cerrar</Text></Pressable>
            <TextInput value={newCollectionName} onChangeText={setNewCollectionName}></TextInput>
            <Pressable onPress={async () => {
              try {
                const docRef = await addDoc(collection(db, "taskscollection"), {idUser: userDocRef, name: newCollectionName})
                const collDoc = await getDoc(doc(db, "taskscollection", docRef.id))
                setTasksCollections(tasksCollections.toSpliced(0, 0, collDoc))
              } catch (error) {
                console.error(error);
              }
              setModalVisible(false)
            }}><Text>Agregar colección</Text></Pressable>
        </Modal>
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
  taskCollection: {
    paddingVertical: "5px",
    paddingHorizontal: "10px",
    color: "white",
    backgroundColor: "green",
    borderRadius: 5
  }
});

export default Profile;
