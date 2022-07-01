import { useReactiveVar } from "@apollo/client";
import { createStackNavigator } from "@react-navigation/stack";
import { isLoggedInVar } from "../apollo";
import CoffeeShop from "../screens/CoffeeShop";
import CreateAccount from "../screens/CreateAccount";
import EditCoffee from "../screens/EditCoffee";
import Home from "../screens/Home";
import Login from "../screens/Login";
import OtherProfile from "../screens/OtherProfile";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import UploadForm from "../screens/UploadForm";
import UploadNav from "./UploadNav";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";
import EditProfile from "../screens/EditProfile";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();

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
        <Stack.Screen name={"Home"} component={Home} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      <Stack.Screen
        name="Profile"
        options={{
          title: isLoggedIn ? `${data?.me?.username} Profile` : "Login",
        }}
        component={isLoggedIn ? Profile : Login}
      />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="EditCoffee" component={EditCoffee} />
      <Stack.Screen name="CoffeeShop" component={CoffeeShop} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons name="close" size={28} color={tintColor} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
