import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { logUserOut } from "../apollo";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";
import { gql } from "@apollo/client";
import AuthButton from "./auth/AuthButton";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: black;
  padding: 20px 0px 0px 0px;
`;
const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 15px;
  margin-bottom: 15px;
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
const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 7px 0px;
  background-color: black;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
`;

export default function MyProfile() {
  const { width, height } = useWindowDimensions();
  const { data } = useMe();
  const navigation = useNavigation();
  return (
    <Container style={{ minHeight: height }}>
      <ProfileContainer>
        {data?.me?.avatarURL === null ? (
          <DefaultAvatar source={require("../assets/default_profile.png")} />
        ) : (
          <Avatar source={{ uri: data?.me?.avatarURL }} />
        )}
      </ProfileContainer>
      <AuthButton text="Log Out" onPress={logUserOut} />
      <ButtonContainer
        onPress={() =>
          navigation.navigate("EditProfile", {
            username: data?.me?.username,
            email: data?.me?.email,
            avatarURL: data?.me?.avatarURL,
          })
        }
      >
        <ButtonText>Edit Profile</ButtonText>
      </ButtonContainer>
    </Container>
  );
}
