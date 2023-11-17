import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import { auth } from "./fbcontext";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    setIsSignedIn(user !== null);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
