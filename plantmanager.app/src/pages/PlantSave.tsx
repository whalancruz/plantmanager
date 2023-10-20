import { StyleSheet, View, Text, Image, Platform, TouchableOpacity } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { Button } from "../components/Button";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { format } from "date-fns";
import { IPlant } from "../interfaces/plant.interfaces";
import { StorageKeys } from "../enums/storageKeys.enums";

import NotificationsCustom from "../utils/notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import Storage from "../utils/storage";
import ptBr from "date-fns/locale/pt-BR";
import waterDropImg from "../assets/waterdrop.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import * as Notifications from "expo-notifications";

interface Params {
    plant: IPlant;
};

export function PlantSave() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const routes = useRoute();
    const { plant } = routes.params as Params;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    async function handleEmitNotification(plant: IPlant) {
        const nextTime = new Date(plant.dateTimeNotification ?? new Date());
        const now = new Date();

        const { times, repeat_every } = plant.frequency;
        if (repeat_every === "week") {
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval);
        }
        else nextTime.setDate(nextTime.getDate() + 1);

        let notificationID = await NotificationsCustom.emit(nextTime, {
            title: "Heeey, 🌱",
            body: `Está na hora de cuidar da sua ${plant.name}`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: {
                plant
            }
        });

        plant.notificationId = notificationID;
    };

    async function handleSave(plant: IPlant) {
        const listPlants = await Storage.get(StorageKeys.plantmanager_plants) as IPlant[] || [];

        plant.dateTimeNotification = String(selectedDateTime);

        listPlants.push(plant);

        await handleEmitNotification(plant);
        await Storage.set(StorageKeys.plantmanager_plants, JSON.stringify(listPlants));
        
        navigation.navigate('Confirmation', {
            title: 'Tudo Certo',
            subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua platinha com muito cuidado.',
            buttonTitle: 'Muito obrigado',
            icon: 'hug',
            nextPage: 'PlantList'
        });

    };

    function handleChangeTime(dateTime: Date | undefined) {
        if (Platform.OS === "android") setShowDatePicker(oldState => !oldState)

        setSelectedDateTime(dateTime ?? new Date())
    };

    function handleOpenDateTimeForAndroid() {
        setShowDatePicker(oldState => !oldState);
    };

    return (
        <>
            <View style={styles.container}>

                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} width={150} height={150} />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controllers}>

                    <View style={styles.tipContainer}>
                        <Image style={styles.tipImage} source={waterDropImg} />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado
                    </Text>

                    {
                        showDatePicker && (
                            <DateTimePicker value={selectedDateTime} mode="time" display="spinner" onChange={(event, date) => handleChangeTime(date)} />
                        )
                    }

                    {
                        Platform.OS === "android" && (
                            <View style={styles.dateTimerPickerContainer}>
                                <TouchableOpacity style={styles.dateTimerPickerButton} onPress={handleOpenDateTimeForAndroid}>
                                    <Text style={styles.dateTimerPickerText}>
                                        {format(selectedDateTime, "HH:mm", { locale: ptBr })}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                    <Button title="Cadastrar planta" onPress={() => handleSave(plant)} />

                </View>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 15,
        marginTop: 10
    },
    controllers: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: Platform.OS === "ios" ? 30 : 20
    },
    tipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: "relative",
        bottom: 70
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
    alertLabel: {
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 15,
        marginBottom: 5
    },
    dateTimerPickerContainer: {
        alignItems: "center",
        paddingVertical: 20
    },
    dateTimerPickerButton: {
        width: "35%",
        backgroundColor: colors.shape,
        paddingVertical: 17,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
    },
    dateTimerPickerText: {
        color: colors.heading,
        fontFamily: fonts.heading
    }
});