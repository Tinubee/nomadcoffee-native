import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
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
`;
const CategoryText = styled.Text`
  color: white;
  margin-left: 20px;
  font-weight: 600;
  font-size: 18px;
`;
const CoffeeShopName = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;
const CoffeeShopNameText = styled.Text`
  color: white;
  margin-left: 20px;
  font-weight: 600;
  font-size: 18px;
`;
const File = styled.Image``;
const ShopBtn = styled.TouchableOpacity`
  background-color: #e7ecf0;
  padding: 3px 10px;
  border-radius: 5px;
  margin-right: 20px;
`;
const ShopText = styled.Text`
  color: black;
  font-weight: 600;
`;

export default function Photo({ id, name, user, photos, categories, isMine }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  //console.log(user);

  const goToProfile = () => {
    navigation.navigate("OtherProfile", {
      username: user.username,
      id: user.id,
    });
  };

  const goToCoffeeShop = () => {
    navigation.navigate("CoffeeShop", {
      id,
      name,
      user,
      photos,
      categories,
      isMine,
    });
  };
  //useEffect(() => {}, [isMine]);
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
        <CoffeeShopNameText>???????????? : {name}</CoffeeShopNameText>
        <ShopBtn onPress={goToCoffeeShop}>
          <ShopText>???????????????</ShopText>
        </ShopBtn>
      </CoffeeShopName>
      <Category>
        <CategoryText>
          ???????????? : {categories.map((item) => item.category)}
        </CategoryText>
      </Category>
    </Container>
  );
}
