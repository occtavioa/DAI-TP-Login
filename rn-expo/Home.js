import { Link } from "@react-navigation/native"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { db } from "./fbcontext"

function Home({ route, navigation }) {
    const { id } = route.params
    const [user, setUser] = useState(null)
    const [userIsCompleted, setUserIsCompleted] = useState(false)

    useEffect(() => {
        getDoc(doc(db, "users", id))
            .then((ds) => {
                setUser(ds.data())
            })
            .catch((e) => {console.error((e))})
    }, [id])

    useEffect(() => {
        setUserIsCompleted(user && (user.name && (user.name !== "")) && (user.surname && (user.surname !== "")))
    }, [user])

    return (
        <View style={{ justifyItems: "center", alignItems: "center" }}>
            {
                (user && userIsCompleted) &&
                    <>
                        <Text>
                            {
                                userIsCompleted ?
                                    <>Bienvenido {user.name} {user.surname}</> :
                                    <>Completá tu perfil</>
                            }
                        </Text>
                        <Link to={{ screen: "Profile", params: { id: id } }} style={styles.pressable}>
                            {
                                userIsCompleted ?
                                    <>Ver mi perfil</> :
                                    <>Completar perfil</>
                            }
                        </Link>
                    </>
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
    }
})

export default Home
