import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/TabIcon";
import SharedStackNav from "./ShardStackNav";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.5)",
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="TabsHome"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabsSearch"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabsProfile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Profile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
