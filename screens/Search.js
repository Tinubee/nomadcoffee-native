import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import styled from "styled-components";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";

export const SEARCH_QUERY = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      user {
        username
        avatarURL
      }
      photos {
        id
        url
      }
      categories {
        category
      }
    }
  }
`;

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

const SearchBar = styled.TextInput`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 10px 15px;
  width: 90%;
  margin: 10px auto;
  margin-top: 40px;
`;

export default function Search() {
  const [word, setWord] = useState("");
  const onChangeText = (text) => setWord(text);

  const { isLoading, data, refetch } = useQuery(SEARCH_QUERY, {
    variables: {
      keyword: word,
    },
  });

  const onSubmit = () => {
    if (word === "") return;

    refetch();
    console.log(data);
  };
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search Coffee Shops"
        placeholderTextColor="gray"
        returnKeyType="search"
        autoCorrect={false}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoCapitalize="none"
      />
      <ScreenLayout loading={isLoading}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor="white"
            />
          }
          style={{ width: "100%" }}
          data={data?.searchCoffeeShops}
          renderItem={({ item }) => <Photo {...item} />}
        />
      </ScreenLayout>
    </Container>
  );
}
