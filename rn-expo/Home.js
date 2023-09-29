import { Link } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { Pressable, Text, View, StyleSheet } from "react-native"

function Home({ route, navigation }) {
    const { id } = route.params
    const [user, setUser] = useState({})
    const [userIsCompleted, setUserIsCompleted] = useState()

    useEffect(() => {
        if (Number.isInteger(id)) {
            axios.get(`http://localhost:5000/users/${id}`)
                .then((response) => response.data)
                .then((user) => {
                    setUser(user)
                    console.log(user);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }, [id])

    useEffect(() => {
        setUserIsCompleted(user.Name !== null && user.Name !== "" && user.Surname !== null && user.Surname !== "")
    }, [user])

    return (
        <View style={{ justifyItems: "center", alignItems: "center" }}>
            {
                userIsCompleted ?
                    <Text>
                        Bienvenido {user.Name} {user.Surname}
                    </Text>
                    :
                    <></>
            }
            <Link to={{ screen: "Profile", params: { id: id } }} style={styles.pressable}>
                {
                    userIsCompleted ?
                        <>Ver mi perfil</> :
                        <>Completar perfil</>
                }
            </Link>
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
    }
})

export default Home
