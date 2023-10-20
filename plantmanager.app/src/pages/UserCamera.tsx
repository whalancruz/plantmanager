import { View, StyleSheet, Image, Text } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { RectButton, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import storage from "../utils/storage";
import { StorageKeys } from "../enums/storageKeys.enums";

export function UserCamera() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [permitionMidia, setPermitionMidia] = useState(false);
    const [imageUri, setImageUri] = useState<string>();

    useEffect(() => {
        handleMidiaPermition();
    }, [])

    async function handleMidiaPermition() {
        const { granted } = await MediaLibrary.requestPermissionsAsync();
        setPermitionMidia(granted);
    };

    async function getImagesFromMediaLibrary() {
        if (!permitionMidia) return;

        let { assets } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
        let imageUri = assets?.[0]?.uri;

        if (imageUri) setImageUri(imageUri);
    };

    async function nextPage() {
        await storage.set(StorageKeys.plantmanager_photoUser, String(imageUri));
        await storage.set(StorageKeys.plantmanager_onboarding, "false");

        navigation.navigate('Confirmation', {
            title: 'Prontinho',
            subtitle: 'Agora vamos cuidas das suas platinhas com muito cuidado.',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextPage: 'PlantSelect'
        });
    };

    return (
        <GestureHandlerRootView style={styles.container}>

            <View style={styles.content}>
                <Image style={styles.image} source={{ uri: imageUri }} />
                <RectButton style={styles.buttonCamera} onPress={getImagesFromMediaLibrary}>
                    <Entypo name="camera" size={24} color="black" />
                </RectButton>
            </View>

            <View>
                <Text style={styles.titulo}>
                    Adicione a sua {"\n"}
                    foto de perfil
                </Text>
                <Text style={styles.subtitulo}>
                    Compartilhe um pouco mais sobre você conosco. Estamos ansiosos para conhecê-lo melhor!
                </Text>
            </View>

            <View style={styles.footerButton}>
                <Button title="Finalizar" disabled={(imageUri ? false : true)} onPress={nextPage} />
            </View>

        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 90,
        paddingHorizontal: 30
    },
    content: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.shape,
        zIndex: 1
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    buttonCamera: {
        position: "absolute",
        bottom: 10,
        right: 11,
        backgroundColor: colors.gray,
        padding: 8,
        borderRadius: 20
    },
    titulo: {
        fontSize: 27,
        fontFamily: fonts.heading,
        lineHeight: 35,
        textAlign: "center",
        marginBottom: 10
    },
    subtitulo: {
        fontSize: 16,
        lineHeight: 28,
        fontFamily: fonts.complement,
        textAlign: "center"
    },
    footerButton: {
        width: "100%"
    }
});