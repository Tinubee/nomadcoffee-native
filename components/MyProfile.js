import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { logUserOut } from "../apollo";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";

const Container = styled.View`
  background-color: black;
  padding: 20px 0px 0px 0px;
`;
const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 15px;
`;
const DefaultAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
const LogoutButton = styled.TouchableOpacity``;

export default function MyProfile() {
  const { width, height } = useWindowDimensions();
  const { data } = useMe();
  return (
    <Container style={{ minHeight: height }}>
      <ProfileContainer>
        {data?.me?.avatarURL === null ? (
          <DefaultAvatar source={require("../assets/default_profile.png")} />
        ) : (
          <Avatar source={{ uri: data?.me?.avatarURL }} />
        )}
      </ProfileContainer>
      <LogoutButton onPress={logUserOut}>
        <Text style={{ color: "white" }}>
          Log Out
          <Ionicons name="log-out-outline" size={30} />
        </Text>
      </LogoutButton>
    </Container>
  );
}
