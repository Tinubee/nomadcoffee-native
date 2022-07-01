import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      avatarURL
    }
  }
`;

export default function OtherProfile({ navigation, route }) {
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
