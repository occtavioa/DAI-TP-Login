import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { db } from "./fbcontext";

function Profile({ route }) {
    const { id } = route.params
    const [user, setUser] = useState(null)
    const [modifiedUser, setModifiedUser] = useState(null)
    const [readOnlyForm, setReadOnlyForm] = useState(true)
    const [respuesta, setRespuesta] = useState()

    useEffect(() => {
        getDoc(doc(db, "users", id))
            .then((ds) => {
                console.log(ds.data());
                setUser(ds.data())
            })
            .catch((e) => {console.error(e);})
    }, [id])

    useEffect(() => {
        if(readOnlyForm) {
            setModifiedUser(user)
        }
    }, [readOnlyForm])

    useEffect(() => {
        console.log(user);
        setModifiedUser(user)
    }, [user])

    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={() => {
                    setReadOnlyForm(!readOnlyForm)
                }}
                    style={[styles.pressable, {margin: "1%"}]}
                >
                {
                    readOnlyForm ?
                        <Text>
                            Editar
                        </Text> :
                        <Text>
                            Visualizar
                        </Text>
                }
                </Pressable>
                {
                    respuesta &&
                        <Text>{respuesta}</Text>
                }
                {
                    !readOnlyForm &&
                    <Pressable onPress={async () => {
                        try {
                            await setDoc(doc(db, "users", id), modifiedUser)
                            setUser(modifiedUser)
                            setRespuesta("Usuario modificado")
                        } catch(e) {
                            setRespuesta("Error")
                            console.error(e);
                        }
                    }}
                        style={[styles.pressable, {margin: "1%"}]}
                    >
                        <Text>
                            Guardar cambios
                        </Text>
                    </Pressable>
                }
            </View>
            {
                modifiedUser ?
                    <View style={styles.textFieldsContainer}>
                        <TextInput style={styles.textField} value={modifiedUser.name ? modifiedUser.name : ""} readOnly={readOnlyForm} onChangeText={(t) => { setModifiedUser({ ...modifiedUser, name: t }) }}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.surname ? modifiedUser.surname : ""} readOnly={readOnlyForm} onChangeText={(t) => { setModifiedUser({ ...modifiedUser, surname: t }) }}></TextInput>
                    </View> :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    pressable: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "blue",
        padding: ".5%",
        borderRadius: "5px",
        margin: ".1%"
    },
    textField: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "grey",
        borderRadius: "5px",
        margin: "1%"
    },
    textFieldsContainer: {
        margin: "1%",
    },
    buttonsContainer: {
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


export default Profile
