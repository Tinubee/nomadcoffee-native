import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components";

const Container = styled.View``;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const DefaultAvatar = styled.Image`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 12.5px;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 21px;
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
const EditBtn = styled.TouchableOpacity`
  background-color: #189bf2;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 30px;
`;
const EditBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;
const goToProfile = () => {
  navigation.navigate("OtherProfile", {
    username: user.username,
    id: user.id,
  });
};
const ShopAdress = styled.View`
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;
const ShopAdressText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export default function ShopInfo({
  data,
  id,
  name,
  longitude,
  latitude,
  category,
}) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  //console.log(category[0].category);

  const goToEditCoffee = () => {
    navigation.navigate("EditCoffee", {
      id,
      name,
      longitude,
      latitude,
      category,
    });
  };

  return (
    <Container>
      <Header>
        {data?.user?.avatarURL === null ? (
          <DefaultAvatar source={require("../assets/default_profile.png")} />
        ) : (
          <UserAvatar source={{ uri: data?.user?.avatarURL }} />
        )}
        <Username>등록자 : {data?.user.username}</Username>
        {data?.isMine ? (
          <EditBtn onPress={goToEditCoffee}>
            <EditBtnText>수정하기</EditBtnText>
          </EditBtn>
        ) : null}
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: width,
        }}
        source={{ uri: data?.photos[0]?.url }}
      />
      <CoffeeShopName>
        <CoffeeShopNameText>카페이름 : {data?.name}</CoffeeShopNameText>
      </CoffeeShopName>
      <Category>
        <CategoryText>
          카테고리 : {data?.categories.map((item) => item.category)}
        </CategoryText>
      </Category>
      <ShopAdress>
        <ShopAdressText>
          카페위치(좌표) : {data?.latitude} , {data?.longitude}
        </ShopAdressText>
      </ShopAdress>
    </Container>
  );
}
