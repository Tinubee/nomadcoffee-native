import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import styled from "styled-components";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop($file: Upload, $name: String!, $caption: String) {
    createCoffeeShop(file: $file, name: $name, caption: $caption) {
      id
      name
      user {
        id
        username
        avatarURL
      }
      photos {
        id
        url
        shopId
      }
      categories {
        category
      }
      isMine
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Photo = styled.Image``;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
  margin-bottom: 20px;
`;
export default function UploadForm({ route, navigation }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const captionRef = useRef();
  const { width, height } = useWindowDimensions();
  const onCompleted = () => {
    navigation.navigate("Home");
  };

  const [uploadPhotoMutation, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted,
    }
  );

  useEffect(() => {
    register("name", { required: true });
    register("caption", { required: true });
  }, [register]);

  const onValid = ({ name, caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.photoLocal,
      name: `1.jpg`,
      type: "image/jpeg",
    });

    uploadPhotoMutation({
      variables: {
        file,
        name,
        caption,
      },
    });
  };
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  return (
    <Container>
      <Photo
        resizeMode="contain"
        style={{
          width,
          height: width,
        }}
        source={{ uri: route.params.photoLocal }}
      />
      <CaptionContainer>
        <TextInput
          placeholder="Write a Coffee Name..."
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          returnKeyType="next"
          onSubmitEditing={() => onNext(captionRef)}
          onChangeText={(text) => setValue("name", text)}
        />
        <TextInput
          placeholder="Write a Coffee Category contain #..."
          ref={captionRef}
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
          returnKeyType="done"
          onChangeText={(text) => setValue("caption", text)}
        />
        <AuthButton
          text="Create Coffee"
          loading={loading}
          disabled={!watch("name") || !watch("caption")}
          onPress={handleSubmit(onValid)}
        />
      </CaptionContainer>
    </Container>
  );
}
