import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { Header } from "../components/Header";
import { EnviromentButton } from "../components/EnviromentButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";
import { IPlant } from "../interfaces/plant.interfaces";
import { StorageKeys } from "../enums/storageKeys.enums";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import storage from "../utils/storage";
import ApiService from "../services/api";

export interface EnviromentProps {
    key: string;
    title: string;
};

export function PlantSelect() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [enviroment, setEnviroment] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<IPlant[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<IPlant[]>([]);
    const [enviromentSelect, setEnviromentSelect] = useState('all');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [userName, setUserName] = useState<string>();
    const [userPhoto, setUserPhoto] = useState<string>();

    useEffect(() => {
        getDataStorage();
    }, []);

    async function getDataStorage() {
        const name = await storage.get(StorageKeys.plantmanager_user) as string;
        const photo = await storage.get(StorageKeys.plantmanager_photoUser) as string;

        setUserName(name);
        setUserPhoto(photo);

        fetchEnvironments();
    };

    async function fetchEnvironments() {
        await ApiService.getFileData(`Environments/GetList`).then(response => {
            console.log("response", response)
            if (!response) return;

            setEnviroment([
                {
                    key: "all",
                    title: "Todos"
                },
                ...response
            ]);

            fetchPlants();
        });
    };

    async function fetchPlants() {
        await ApiService.getFileData(`Plants/GetList?sort=Name&pageSize=10&pageAtual=${page}`).then(response => {
            if (!response) return setLoading(true);

            setPlants((oldValue) => {
                const existingPlantNames = new Set(oldValue.map((plant) => plant.id));
                const newData = response.filter((plant: any) => !existingPlantNames.has(plant.id));
                return [...oldValue, ...newData];
            });

            setFilteredPlants((oldValue) => {
                const existingPlantNames = new Set(oldValue.map((plant) => plant.id));
                const newData = response.filter((plant: any) => !existingPlantNames.has(plant.id));
                return [...oldValue, ...newData];
            });

            setPage((oldValue) => oldValue + 1);
            setLoading(false);
            setLoadingMore(false);
        });
    };

    function handleFetchMore(distance: number) {
        if (distance < 1) return;

        setLoadingMore(true);
        setPage((oldValue) => oldValue + 1);
        fetchPlants();
    };

    function handleEnviromentSelected(enviroment: EnviromentProps) {
        setEnviromentSelect(enviroment.key);

        if (enviroment.key === 'all') return setFilteredPlants(plants);

        const filtered = plants.filter(plant => plant.environments.includes(enviroment.key))
        setFilteredPlants(filtered);
    };

    function handlePlantSave(plant: IPlant) {
        navigation.navigate('PlantSave', { plant });
    };

    if (loading) return <Load />
    return (
        <SafeAreaView style={styles.container}>

            <Header title="Olá," subtitle={userName ?? ""} photo={userPhoto ?? ""} />

            <View style={styles.content}>

                <View>
                    <Text style={styles.title}>Em qual ambiente</Text>
                    <Text style={styles.subtitle}>você quer colocar sua planta</Text>
                </View>

                <View>
                    <GestureHandlerRootView>
                        <FlatList
                            keyExtractor={(item) => String(item.key)}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.enviromentList}
                            data={enviroment}
                            horizontal
                            renderItem={({ item }) => (
                                <EnviromentButton
                                    title={item.title}
                                    active={item.key === enviromentSelect}
                                    onPress={() => handleEnviromentSelected(item)}
                                />
                            )} />
                    </GestureHandlerRootView>
                </View>

                <View style={styles.plants}>
                    <GestureHandlerRootView >
                        <FlatList
                            keyExtractor={(item) => String(item.id)}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            style={{}}
                            data={filteredPlants}
                            onEndReachedThreshold={0.1}
                            onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                            ListFooterComponent={
                                loadingMore ? <ActivityIndicator style={styles.loader} color={colors.green} /> : <></>
                            }
                            renderItem={({ item }) => (
                                <PlantCardPrimary data={item} onPress={() => handlePlantSave(item)} />
                            )} />
                    </GestureHandlerRootView>
                </View>


            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 25,
        color: colors.heading
    },
    enviromentList: {
        height: 56,
        marginVertical: 20
    },
    plants: {
        flex: 1
    },
    loader: {
        paddingBottom: 10
    }
})