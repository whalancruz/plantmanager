import React from "react";
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import colors from "../styles/colors";
import fonts from '../styles/fonts';
import wateringImg from '../assets/watering.png';

export default function Welcome() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleStart() {
        navigation.navigate('UserIndentification')
    };

    return <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>

            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>

            <Image source={wateringImg} style={styles.image} resizeMode="contain" />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity onPress={handleStart} style={styles.button} activeOpacity={0.7}>
                <Entypo style={styles.buttonIcon} name="chevron-right" size={24} />
            </TouchableOpacity>
            
        </View>
    </SafeAreaView>
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 48,
        lineHeight: 36,
        fontFamily: fonts.heading
    },
    subtitle: {
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get("window").width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
        paddingHorizontal: 16
    },
    buttonIcon: {
        color: colors.white
    }
});