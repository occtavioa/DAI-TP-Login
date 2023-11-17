import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Modal, Pressable, Text, TextInput, View } from "react-native";
import { db } from "./fbcontext";

function Collection({ route }) {
    const {id} = route.params
    const [tasksCollection, setTasksCollection] = useState()
    const [tasks, setTasks] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [newTaskName, setNewTaskName] = useState("")
    
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
    
    return (
        <ImageBackground src={require("./assets/background.png")}>
            <View>
                <FlatList data={tasks} renderItem={({item}) => (<>
                    <Text>{item.data().name}</Text>
                    <Text>{item.data().state}</Text>
                </>)}/>
                <Pressable onPress={() => {setModalVisible(true)}}><Text>Agregar tarea</Text></Pressable>
                <Modal visible={modalVisible}>
                    <Pressable onPress={() => {setModalVisible(false)}}><Text>Cerrar</Text></Pressable>
                    <TextInput value={newTaskName} onChangeText={setNewTaskName}></TextInput>
                    <Pressable onPress={async () => {
                        try {
                            const docRef = await addDoc(collection(db, "tasks"), {idCollection: tasksCollection.ref, name: newTaskName, state: "todo"})
                            const taskDoc = await getDoc(doc(db, "tasks", docRef.id))
                            setTasks(tasks.toSpliced(0, 0, taskDoc))
                        } catch (error) {
                            console.error(error);
                        }
                        setModalVisible(false)
                    }}><Text>Crear</Text></Pressable>
                </Modal>
            </View>
        </ImageBackground>
    )
}

export default Collection
