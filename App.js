import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import TabsNav from "./navigators/TabsNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    return Promise.all(fontPromises);
  };

  useEffect(() => {
    const preload = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        isLoggedInVar(true);
        tokenVar(token);
      }
      try {
        await SplashScreen.preventAutoHideAsync();
        preloadAssets();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(true);
      }
    };
    preload();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <TabsNav />
        </NavigationContainer>
      </ApolloProvider>
    </View>
  );
}
