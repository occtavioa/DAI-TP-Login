import { Link } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { ImageBackground } from "react-native-web";
import { auth, db } from "./fbcontext";

function Home({ route }) {
  const { id } = route.params;
  const [user, setUser] = useState(null);
  const [userIsCompleted, setUserIsCompleted] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "users", id))
      .then((ds) => {
        setUser(ds.data());
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  useEffect(() => {
    setUserIsCompleted(
      user &&
        user.name &&
        user.name !== "" &&
        user.surname &&
        user.surname !== ""
    );
  }, [user]);

  useEffect(() => {
    console.log(auth);
  }, [])
  
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
        {user !== null && (
          <>
            <Text style={{ color: "white" }}>
              {userIsCompleted ? (
                <>
                  Bienvenido {user.name} {user.surname}
                </>
              ) : (
                <>Completá tu perfil</>
              )}
            </Text>
            <Link
              to={{ screen: "Profile", params: { id: id } }}
              style={styles.pressable}
            >
              <Text style={{ color: "white" }}>
                {userIsCompleted ? <>Ver mi perfil</> : <>Completar perfil</>}
              </Text>
            </Link>
          </>
        )}
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
