import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { PlantSelect } from "../pages/PlantSelect";
import { MaterialIcons } from "@expo/vector-icons";
import { PlantList } from "../pages/PlantList";
import { Platform } from "react-native";

import colors from "../styles/colors";

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.green,
                tabBarInactiveTintColor: colors.heading,
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    paddingVertical: 5,
                    height: Platform.OS === "ios" ? 85 : 75,
                    paddingBottom: Platform.OS === "ios" ? 30 : 15,
                    paddingTop: 15,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }
            }}>

            <AppTab.Screen name="Nova Planta" component={PlantSelect} options={{
                tabBarIcon: MyPlantSelectTab,
                headerShown: false
            }} />

            <AppTab.Screen name="Minhas Plantas" component={PlantList} options={{
                tabBarIcon: MyPlantListTab,
                headerShown: false
            }} />

        </AppTab.Navigator>
    )
};

const MyPlantSelectTab = ({ size, color }: any) => (
    <MaterialIcons name="add-circle-outline" size={size} color={color} />
);

const MyPlantListTab = ({ size, color }: any) => (
    <MaterialIcons name="format-list-bulleted" size={size} color={color} />
);

export default AuthRoutes;