import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
      id
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, watch } = useForm();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    navigation.navigate("Profile");
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATEACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data) => {
    createAccountMutation({
      variables: {
        ...data,
      },
    });
  };

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        onSubmitEditing={() => onNext(emailRef)}
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("email")}
        ref={emailRef}
        placeholder="Email"
        onSubmitEditing={() => onNext(passwordRef)}
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
