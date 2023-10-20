import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserIndentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
import { PlantSave } from "../pages/PlantSave";
import { UserCamera } from "../pages/UserCamera";

import AuthRoutes from "./tab.routes";
import Welcome from "../pages/Welcome";
import { useEffect, useState } from "react";
import storage from "../utils/storage";
import { StorageKeys } from "../enums/storageKeys.enums";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    const [initialRoute, setInitialRoute] = useState<string>();

    useEffect(() => {

        async function initialize() {
            const param = (await storage.get(StorageKeys.plantmanager_onboarding)) as boolean ?? true;
            let onBoarding = Boolean(param);
            if (onBoarding) setInitialRoute("Welcome");
            else setInitialRoute("PlantSelect");
        }

        initialize();
    }, [])

    if(!initialRoute) return;
    return <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="UserIndentification" component={UserIndentification} />
        <Stack.Screen name="UserCamera" component={UserCamera} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="PlantSave" component={PlantSave} />
        <Stack.Screen name="PlantSelect" component={AuthRoutes} />
        <Stack.Screen name="PlantList" component={AuthRoutes} />
    </Stack.Navigator>
};