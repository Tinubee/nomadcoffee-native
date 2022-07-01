import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const Avatar = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-bottom: 30px;
`;
const DefaultAvatar = styled(Avatar)``;
const TextInput = styled.TextInput`
  width: 90%;
  color: white;
  padding: 10px 10px;
  border: 1px solid white;
  margin-bottom: 15px;
`;

const EditButton = styled.TouchableOpacity`
  width: 90%;
  background-color: ${Platform.OS === "web" ? "#0095f6" : "black"};
  padding: 15px 15px;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: ${Platform.OS === "web" ? "white" : "white"};
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  margin-bottom: 50px;
`;

const EditProfileImage = styled.TouchableOpacity``;
const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $email: String
    $password: String
    $avatarURL: Upload
  ) {
    editProfile(
      username: $username
      email: $email
      password: $password
      avatarURL: $avatarURL
    ) {
      ok
      error
      id
    }
  }
`;

export default function EditProfile({ route, navigation }) {
  const [error, setError] = useState();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: route?.params?.username,
    },
  });

  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
  }, []);

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted: async (data) => {
      const {
        editProfile: { ok, error },
      } = data;
      if (!ok) {
        setError(error);
      } else {
        navigation.navigate("Profile");
      }
    },
  });

  const onValid = (data) => {
    if (!loading) {
      editProfile({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <ScreenLayout loading={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
        style={{ width: "100%", alignItems: "center" }}
      >
        {route?.params?.avatarURL === null ? (
          <DefaultAvatar source={require("../assets/default_profile.png")} />
        ) : (
          <Avatar source={{ uri: route?.params?.avatarURL }} />
        )}
        <EditProfileImage>
          <ButtonText>Edit Profile Image</ButtonText>
        </EditProfileImage>
        <TextInput
          value={watch("username")}
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255, 0.8)"
          returnKeyType="next"
          onChangeText={(text) => setValue("username", text)}
        />
        <TextInput
          value={watch("email")}
          placeholder="email"
          placeholderTextColor="rgba(255,255,255, 0.8)"
          returnKeyType="next"
          onChangeText={(text) => setValue("email", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <EditButton onPress={handleSubmit(onValid)}>
          <ButtonText>Edit Profile</ButtonText>
        </EditButton>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
