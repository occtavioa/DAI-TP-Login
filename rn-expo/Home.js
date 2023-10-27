import { Link } from "@react-navigation/native"
import axios from "axios"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Pressable, Text, View, StyleSheet } from "react-native"
import { db } from "./fbcontext"

function Home({ route, navigation }) {
    const { id } = route.params
    const [user, setUser] = useState({})
    const [userIsCompleted, setUserIsCompleted] = useState()

    useEffect(() => {
        getDoc(doc(db, "users", id))
            .then((u) => {
                setUser(u.data())
            })
            .catch((e) => {console.error((e))})
    }, [id])

    useEffect(() => {
        console.log(user);
        setUserIsCompleted(user.name !== null && user.name !== "" && user.surname !== null && user.surname !== "")
    }, [user])

    return (
        <View style={{ justifyItems: "center", alignItems: "center" }}>
            {
                userIsCompleted ?
                    <Text>
                        Bienvenido {user.name} {user.surname}
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
