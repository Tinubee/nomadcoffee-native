import { useReactiveVar } from "@apollo/client";
import { createStackNavigator } from "@react-navigation/stack";
import { isLoggedInVar } from "../apollo";
import Home from "../screens/Home";
import Login from "../screens/Login";
import OtherProfile from "../screens/OtherProfile";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,255,255,0.5)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen name={"Coffee List"} component={Home} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      <Stack.Screen name="Profile" component={isLoggedIn ? Profile : Login} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
    </Stack.Navigator>
  );
}
