import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import { auth } from "./fbcontext";

const Stack = createNativeStackNavigator();

export default function App() {
  auth.onAuthStateChanged((user) => {console.log(user);})
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          auth.currentUser === null ?
            <><Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen></> :
            <><Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Profile" component={Profile}></Stack.Screen></>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
