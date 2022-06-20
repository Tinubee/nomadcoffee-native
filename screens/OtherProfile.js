import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function OtherProfile({ navigation, route }) {
  console.log(route.params);
  useEffect(() => {
    navigation.setOptions({
      title: route.params.username,
    });
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>{route.params.username}'s Profile</Text>
    </View>
  );
}
