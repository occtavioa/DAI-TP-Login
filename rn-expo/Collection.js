import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
        <ImageBackground
            source={require("./assets/background.png")}
            style={styles.background}
        >
            <View>
                <FlatList data={tasks} renderItem={({item}) => (<>
                    <View key={item.id} style={styles.task}>
                        <Text style={styles.taskAttribute}>{item.get("name")}</Text>
                        <TextInput style={styles.taskAttribute} value={item.get("state")}/>
                    </View>
                </>)}/>
                <Pressable style={styles.pressable} onPress={() => {setModalVisible(true)}}><Text style={{color: "white"}}>Agregar tarea</Text></Pressable>
                <Modal style={styles.modal} visible={modalVisible}>
                    <Pressable onPress={() => {setModalVisible(false)}}><Text>Cerrar</Text></Pressable>
                    <View style={styles.newTaskFormControl}>
                        <Text style={styles.newTaskFormLabel}>Tarea</Text>
                        <TextInput style={styles.newTaskFormInput} value={newTaskName} onChangeText={setNewTaskName}></TextInput>
                    </View>
                    <Pressable onPress={async () => {
                        if(newTaskName.trim() === "") {
                            console.error("Invalid task name")
                            return
                        }
                        try {
                            const newDocRef = await addDoc(collection(db, "tasks"), {idCollection: tasksCollection.ref, name: newTaskName, state: "todo"})
                            const newTaskDoc = await getDoc(doc(db, "tasks", newDocRef.id))
                            setTasks(tasks.toSpliced(0, 0, newTaskDoc))
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    modal: {
    },
    task: {
        display: "flex",
        flexDirection: "row",
        width: "15%",
        justifyContent: "space-between"
    },
    taskAttribute: {
        marginHorizontal: "1%",
        color: "white"
    },
    pressable: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    newTaskFormControl: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between",
    },
    newTaskFormInput: {
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1
    },
    newTaskFormLabel: {}
})

export default Collection
