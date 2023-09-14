import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native-web"

function Home({route, navigation}) {
    const {id} = route.params
    const [user, setUser] = useState(new Object())

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((response) => response.data)
            .then((user) => {
                setUser(user)
                console.log(user);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    return (
        <View>
            {
                user.Name && user.Surname ?
                    <Text>Bienvenido {user.Name} {user.Surname}</Text> :
                    <Pressable onPress={() => {
                        navigation.navigate("Profile", {id: id})
                    }}>
                        <Text>Completar perfil</Text>
                    </Pressable>
            }
        </View>
    )
}

export default Home
