import { Picker } from "@react-native-picker/picker"
import { updateDoc } from "firebase/firestore"
import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

function Task({task, handleDelete}) {
    const [state, setState] = useState(task.get("state"))
    
    return (
        <View style={styles.task}>
            <Text style={styles.taskName}>{task.get("name")}</Text>
            <Picker
                selectedValue={state}
                onValueChange={(itemValue) => {setState(itemValue)}}
            >
                <Picker.Item label="Todo" value={"todo"}/>
                <Picker.Item label="In process" value={"InProcess"}/>
                <Picker.Item label="Done" value={"Done"}/>
            </Picker>
            <Pressable
                style={styles.updateTaskPressable}
                onPress={async () => {
                    try {
                        await updateDoc(task.ref, {"state": state})
                    } catch (error) {
                        console.error(error);
                    }
                }}
            ><Text>Guardar</Text></Pressable>
            <Pressable
                onPress={async () => {await handleDelete(task)}}
            >
                <Text>Eliminar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between",
    },
    taskName: {
        marginHorizontal: "2%",
        marginVertical: "1%",
        color: "white",
        textAlign: "center",
    },
    updateTaskPressable: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    }
})

export default Task
