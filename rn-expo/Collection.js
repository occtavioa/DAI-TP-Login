import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
import { db } from "./fbcontext";

function Collection({ route }) {
    const {id} = route.params
    const [tasksCollection, setTasksCollection] = useState()
    const [tasks, setTasks] = useState([])
    
    useEffect(() => {
        getDoc(doc(db, "taskscollection", id))
            .then((ds) => {setTasksCollection(ds)})
            .catch((e) => {console.error(e)})
    }, [id])
    
    useEffect(() => {
        if(typeof tasksCollection === "undefined") {return} 
        const q = query(collection(db, "tasks"), where("idCollection", "==", tasksCollection.ref))
        getDocs(q)
            .then((qs) => {setTasks(qs.docs)})
            .catch((e) => {console.error(e);})
    }, [tasksCollection])

    useEffect(() => {
        console.log("Tasks", tasks);
    }, [tasks])

    useEffect(() => {
        console.log("Collection", tasksCollection);
    }, [tasksCollection])
    
    return (
        <ImageBackground src={require("./assets/background.png")}>
            <View>
                <FlatList data={tasks} renderItem={({item}) => <Text>{item.data().name}</Text>}/>
            </View>
        </ImageBackground>
    )
}

export default Collection
