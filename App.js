import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
