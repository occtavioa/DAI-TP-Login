import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";

function Profile({route}) {
    const {id} = route.params
    const [user, setUser] = useState()
    const [modifiedUser, setModifiedUser] = useState()
    const [readOnlyForm, setReadOnlyForm] = useState(true)
    const [respuesta, setRespuesta] = useState(false)

    useEffect(() => {
        if(id) {
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
        setModifiedUser(user)
    }, [readOnlyForm])
    
    return (
        <View>
            <Pressable onPress={() => {
                setReadOnlyForm(!readOnlyForm)
            }}
                style={styles.pressable}
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
                respuesta ?
                    respuesta === 200 ?
                        <Text style={styles.successMessage}>Usuario modificado</Text> :
                        <Text style={styles.errorMessage}>
                            {
                                respuesta === 400 ?
                                    <>Credenciales invalidas</> :
                                respuesta === 500 ?
                                    <>Error de red</> :
                                    <>Error desconocido</>
                            }
                        </Text> :
                    <></>
            }
            {
                !readOnlyForm &&
                    <Pressable onPress={async () => {
                        axios.put(`http://localhost:5000/users/${id}`, {
                            username: modifiedUser.UserName,
                            password: modifiedUser.Password,
                            name: modifiedUser.Name,
                            surname: modifiedUser.Surname,
                        }, {
                            validateStatus: false
                        })
                            .then((resposne) => {
                                if(resposne.status === 200) {
                                    setUser(modifiedUser)
                                }
                                setRespuesta(resposne.status)
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                        }}
                        style={styles.pressable}
                    >
                        <Text>
                            Guardar cambios
                        </Text>
                    </Pressable>
            }
            {
                user ?
                    <>
                        <TextInput style={styles.textField} value={modifiedUser.UserName} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, UserName: t})}}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.Password} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, Password: t})}}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.Name ? modifiedUser.Name : ""} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, Name: t})}}></TextInput>
                        <TextInput style={styles.textField} value={modifiedUser.Surname ? modifiedUser.Surname : ""} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, Surname: t})}}></TextInput>
                    </> :
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
  

export default Profile
