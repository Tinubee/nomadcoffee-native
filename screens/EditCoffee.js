import styled from "styled-components";
import React, { useEffect } from "react";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useMutation } from "@apollo/client";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;
const NameInput = styled.TextInput`
  width: 70%;
  color: white;
  padding: 10px 15px;
  border: 1px solid white;
  margin-top: 15px;
  margin-bottom: 3px;
`;

const LatitudeInput = styled(NameInput)``;
const LongitudeInput = styled(NameInput)``;
const CategoryInput = styled(NameInput)`
  margin-bottom: 30px;
`;

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop($id: Int!, $name: String, $caption: String) {
    editCoffeeShop(id: $id, name: $name, caption: $caption) {
      ok
      error
      id
    }
  }
`;

export default function EditCoffee({ route, navigation }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: route?.params?.name,
      caption: route?.params?.category.map((item) => item.category).join(""),
    },
    variables: { id: route?.params?.id },
  });

  setValue("id", route?.params?.id);
  const [editCoffeeShopMutation, { loading }] = useMutation(
    EDIT_COFFEESHOP_MUTATION,
    {
      onCompleted: async (data) => {
        const {
          editCoffeeShop: { ok, error },
        } = data;

        if (!ok) {
          alert(error);
          return;
        } else {
          navigation.navigate("Home");
        }
      },
    }
  );
  const onValid = (data) => {
    if (!loading) {
      editCoffeeShopMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("id", { required: true });
    register("name", { required: true });
    register("caption", { required: true });
  }, []);

  return (
    <ScreenLayout>
      <Name>현재카페이름 : {route?.params?.name}</Name>
      <NameInput
        placeholder="카페이름을 입력하세요"
        placeholderTextColor="rgba(255,255,255, 0.8)"
        value={watch("name")}
        onChangeText={(text) => setValue("name", text)}
      />
      <CategoryInput
        placeholder="카테고리를 입력하세요"
        placeholderTextColor="rgba(255,255,255, 0.8)"
        value={watch("caption")}
        onChangeText={(text) => setValue("caption", text)}
      />
      <AuthButton
        text="수정 완료"
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </ScreenLayout>
  );
}
