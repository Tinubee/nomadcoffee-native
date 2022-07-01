import React, { useRef, useEffect } from "react";
import { TextInput } from "../components/auth/AuthShared";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { colors } from "../colors";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
      username
    }
  }
`;

const Signup = styled.TouchableOpacity`
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const SignupText = styled.Text`
  color: ${colors.blue};
  font-size: 14px;
`;

export default function Login({ route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const navigation = useNavigation();
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token, error, username },
    } = data;

    if (ok) {
      await logUserIn(token, username);
    } else {
      alert(error);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
      <Signup onPress={goToCreateAccount}>
        <SignupText>Sign Up</SignupText>
      </Signup>
    </AuthLayout>
  );
}
