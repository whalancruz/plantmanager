import React, { useEffect } from "react";
import { View } from "react-native";
import { useFonts, Jost_600SemiBold, Jost_400Regular } from "@expo-google-fonts/jost"

import NotificationsCustom from "./src/utils/notifications";
import Routes from "./src/routes/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_600SemiBold, Jost_400Regular });

  useEffect(() => {

    async function notifyInitialize() {
      await NotificationsCustom.permissions();
    };

    notifyInitialize();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      {
        fontsLoaded && (<Routes />)
      }
    </View>);
};