import axios from "axios"
import { useEffect, useState } from "react"
import { View } from "react-native-web"

function Home({route, navigation}) {
    const {id} = route.params
    const [userIsCompleted, setUserIsCompleted] = useState()

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((response) => {
                if(response.status === 200) {
                    
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    return (
        <View>
        </View>
    )
}

export default Home
