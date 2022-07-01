import { gql, useQuery } from "@apollo/client";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components";

export const HOME_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
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
const Seperator = styled.View`
  height: 20px;
`;
export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const { data, loading, refetch, fetchMore } = useQuery(HOME_QUERY, {
    variables: { offset: 0 },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    return async () => {
      await refetch();
    };
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return <Photo {...item} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="white"
          />
        }
        style={{ width: "100%" }}
        data={data?.seeCoffeeShops}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
