import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native-web";

function Profile({route}) {
    const {id} = route.params
    const [user, setUser] = useState()
    const [modifiedUser, setModifiedUser] = useState()
    const [readOnlyForm, setReadOnlyForm] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((response) => response.data)
            .then((user) => {
                setUser(user)
                setModifiedUser(user)
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])
    
    useEffect(() => {
        setModifiedUser(user)
    }, [readOnlyForm])
    
    return (
        <View>
            <Pressable onPress={() => {
                setReadOnlyForm(!readOnlyForm)
            }}>
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
                !readOnlyForm &&
                    <Pressable onPress={() => {
                        axios.put(`http://localhost:5000/users/${id}`, {
                            username: modifiedUser.UserName,
                            password: modifiedUser.Password,
                            name: modifiedUser.Name,
                            surname: modifiedUser.Surname,
                        })
                            .then(() => {
                                setUser(modifiedUser)
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    }}>
                        <Text>
                            Guardar cambios
                        </Text>
                    </Pressable>
            }
            {
                user ?
                    <>
                        <TextInput value={modifiedUser.UserName} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, UserName: t})}}></TextInput>
                        <TextInput value={modifiedUser.Password} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, Password: t})}}></TextInput>
                        <TextInput value={modifiedUser.Name ? modifiedUser.Name : ""} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, Name: t})}}></TextInput>
                        <TextInput value={modifiedUser.Surname ? modifiedUser.Surname : ""} readOnly={readOnlyForm} onChangeText={(t) => {setModifiedUser({...modifiedUser, Surname: t})}}></TextInput>
                    </> :
                    <></>
            }
        </View>
    )
}

export default Profile
