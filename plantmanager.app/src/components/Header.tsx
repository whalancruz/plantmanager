import { StyleSheet, Text, Image, View, Platform } from "react-native";
import { IHeader } from "../interfaces/header.interfaces";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header({ title, subtitle, photo }: IHeader) {
    const hasPhoto: boolean = !!photo;

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subtitle}</Text>
            </View>

            {hasPhoto && (
                <Image style={styles.image} source={{ uri: photo }} />
            )}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        paddingTop: Platform.OS == "ios" ? 35 : 70,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    subTitle: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 36
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100
    }
})