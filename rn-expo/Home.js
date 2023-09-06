import axios from "axios"
import { useEffect, useState } from "react"

function Home({route, navigation}) {
    const [user, setUser] = useState()
    const {id} = route.params

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((response) => {
                if(response.status === 200) {
                    setUser(response.data)
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <View>

        </View>
    )
}

export default Home
