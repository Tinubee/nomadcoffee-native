import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";

export const HOME_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
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
    }
  }
`;

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(HOME_QUERY, {
    variables: { offset: 0 },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
        renderItem={({ item }) => <Photo {...item} />}
      />
    </ScreenLayout>
  );
}
