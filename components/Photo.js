import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const DefaultAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const Category = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CategoryText = styled.Text`
  color: white;
  margin-left: 5px;
  font-weight: 600;
  font-size: 18px;
`;
const CoffeeShopName = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CoffeeShopNameText = styled.Text`
  color: white;
  margin-left: 5px;
  font-weight: 600;
  font-size: 18px;
`;
const File = styled.Image``;
export default function Photo({ name, user, photos, categories }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("OtherProfile", {
      username: user.username,
      id: user.id,
    });
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        {user.avatarURL === null ? (
          <DefaultAvatar source={require("../assets/default_profile.png")} />
        ) : (
          <UserAvatar source={{ uri: user.avatarURL }} />
        )}
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: width,
        }}
        source={{ uri: photos[0].url }}
      />
      <CoffeeShopName>
        <CoffeeShopNameText>카페이름 : {name}</CoffeeShopNameText>
      </CoffeeShopName>
      <Category>
        <CategoryText>카테고리 : {categories[0].category}</CategoryText>
      </Category>
    </Container>
  );
}
