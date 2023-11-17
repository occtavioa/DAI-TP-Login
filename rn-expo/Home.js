import { Link } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { ImageBackground } from "react-native-web";
import { auth, db } from "./fbcontext";

function Home({ route }) {
  const [user, setUser] = useState();
  const [userIsCompleted, setUserIsCompleted] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((ds) => {
        setUser(ds.data());
      })
      .catch((e) => {
        console.error(e);
      });
  }, [auth.currentUser.uid]);

  useEffect(() => {
    setUserIsCompleted(
      typeof user !== "undefined" &&
        typeof user.name === "string" &&
        user.name !== "" &&
        typeof user.surname === "string" &&
        user.surname !== ""
    );
  }, [user]);

  return (
    <ImageBackground
      source={require("./assets/background.png")}
      style={styles.background}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>
          {userIsCompleted ? (
            <>
              Bienvenido {user.name} {user.surname}
            </>
          ) : (
            <>Completá tu perfil</>
          )}
        </Text>
        <Link to={{ screen: "Profile" }} style={styles.pressable}>
          <Text style={{ color: "white" }}>
            {userIsCompleted ? <>Ver mi perfil</> : <>Completar perfil</>}
          </Text>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Home;
