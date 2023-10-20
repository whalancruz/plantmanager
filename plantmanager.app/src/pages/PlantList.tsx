import { SafeAreaView, StyleSheet, View, Image, Text, FlatList, Alert } from "react-native";
import { Header } from "../components/Header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import { useEffect, useState } from "react";
import { IPlant } from "../interfaces/plant.interfaces";
import { StorageKeys } from "../enums/storageKeys.enums";
import { formatDistance } from "date-fns";
import { Load } from "../components/Load";
import { isEqual } from "lodash";

import NotificationsCustom from "../utils/notifications";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import ptBr from "date-fns/locale/pt-BR";
import waterDropImg from "../assets/waterdrop.png";
import storage from "../utils/storage";


export function PlantList() {

    const [plants, setPlants] = useState<IPlant[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();
    const [userPhoto, setUserPhoto] = useState<string>();

    useEffect(() => {
        getPlantsStorage();
    }, [])

    useEffect(() => {
        getUserFromStorage();
    }, [])

    async function getUserFromStorage() {
        const photo = await storage.get(StorageKeys.plantmanager_photoUser) as string;
        setUserPhoto(photo);
    };

    async function getPlantsStorage() {
        let plantsStorage = await storage.get(StorageKeys.plantmanager_plants) as IPlant[];

        if (!plantsStorage || plantsStorage.length === 0) return setLoading(false);

        const nextTime = formatDistance(
            new Date(plantsStorage[0].dateTimeNotification ?? new Date()).getTime(),
            new Date().getTime(),
            { locale: ptBr }
        );

        setNextWatered(`Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime}`);

        setPlants(plantsStorage);
        setLoading(false);
    };

    function handleRemove(element: IPlant) {
        Alert.alert('Remover', `Deseja remover á ${element.name}?`, [
            {
                text: "Não",
                style: 'cancel'
            },
            {
                text: "Sim",
                style: 'default',
                onPress: () => {
                    storage.get(StorageKeys.plantmanager_plants).then(async (plantsStorage: IPlant[]) => {
                        plantsStorage = plantsStorage.filter(plant => !isEqual(plant, element))

                        await NotificationsCustom.remove(element.notificationId);
                        await storage.set(StorageKeys.plantmanager_plants, JSON.stringify(plantsStorage));

                        setPlants(plantsStorage);
                    });
                }
            }
        ])
    };

    if (loading) return <Load />
    return (
        <SafeAreaView style={styles.container}>

            <Header title="Minhas" subtitle="Plantinhas" photo={userPhoto ?? ""} />

            <View style={styles.content}>

                {
                    plants.length > 0 && (
                        <>
                            <View style={styles.tipContainer}>
                                <Image style={styles.tipImage} source={waterDropImg} />
                                <Text style={styles.tipText}>
                                    {nextWatered}
                                </Text>
                            </View>

                            <View>

                                <Text style={styles.platsTitle}>
                                    Próximas regadas
                                </Text>

                                <GestureHandlerRootView style={styles.plants}>
                                    <FlatList
                                        keyExtractor={(item) => String(item.id)}
                                        showsVerticalScrollIndicator={false}
                                        data={plants}
                                        renderItem={({ item }) => (
                                            <PlantCardSecondary data={item} handleRemove={() => handleRemove(item)} />
                                        )} />
                                </GestureHandlerRootView>
                            </View>

                        </>
                    )
                }


            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 15
    },
    tipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        lineHeight: 24
    },
    plants: {
        minHeight: "100%",
        marginTop: 5,
        marginBottom: 70
    },
    platsTitle: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 20,
        lineHeight: 60
    },
    load: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loadView: {
        width: 300,
        height: 300
    }
})