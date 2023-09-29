import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

function Profile({ route }) {
    const { id } = route.params
    const [user, setUser] = useState()
    const [modifiedUser, setModifiedUser] = useState()
    const [readOnlyForm, setReadOnlyForm] = useState(true)
    const [respuesta, setRespuesta] = useState()

    useEffect(() => {
        if (Number.isInteger(id)) {
            axios.get(`http://localhost:5000/users/${id}`)
                .then((response) => response.data)
                .then((user) => {
                    setUser(user)
                    setModifiedUser(user)
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }, [id])

    useEffect(() => {
        if(readOnlyForm) {
            setModifiedUser(user)
        }
    }, [readOnlyForm])

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
                        <Text style={[respuesta === "Usuario modificado" ? styles.successMessage : styles.errorMessage, {margin: "1%"}]}>{respuesta}</Text>
                }
                {
                    !readOnlyForm &&
                    <Pressable onPress={async () => {
                        axios.put(`http://localhost:5000/users/${id}`, {
                            username: modifiedUser.UserName,
                            password: modifiedUser.Password,
                            name: modifiedUser.Name,
                            surname: modifiedUser.Surname,
                        })
                            .then((response) => {
                                if (response.status === 200) {
                                    setUser(modifiedUser)
                                }
                                setRespuesta(
                                    response.status === 200 ?
                                        "Usuario modificado" :
                                        "Error desconocido"
                                )
                            })
                            .catch((error) => {
                                console.error(error);
                                if(error.response) {
                                    setRespuesta(
                                        error.response.status === 400 ?
                                            "Credenciales invalidas" :
                                            error.response.status === 500 ?
                                                "Error de servidor" :
                                                "Error desconocido"
                                    )
                                } else if (error.request) {
                                    setRespuesta("Error de red")
                                } else {
                                    setRespuesta("Error desconocido")
                                }
                            })
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
                user ?
                    <View style={styles.textFieldsContainer}>
                        <TextInput style={styles.textField} value={modifiedUser.UserName} readOnly={readOnlyForm} onChangeText={(t) => { setModifiedUser({ ...modifiedUser, UserName: t }) }}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.Password} readOnly={readOnlyForm} onChangeText={(t) => { setModifiedUser({ ...modifiedUser, Password: t }) }}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.Name ? modifiedUser.Name : ""} readOnly={readOnlyForm} onChangeText={(t) => { setModifiedUser({ ...modifiedUser, Name: t }) }}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.Surname ? modifiedUser.Surname : ""} readOnly={readOnlyForm} onChangeText={(t) => { setModifiedUser({ ...modifiedUser, Surname: t }) }}></TextInput>
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
