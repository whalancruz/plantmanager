import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { Button } from "../components/Button";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextPage: string;
}

const emojis = {
    hug: '😋',
    smile: '😁'
}

export function Confirmation() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const routes = useRoute();

    const {
        buttonTitle,
        icon,
        nextPage,
        subtitle,
        title
     } = routes.params as Params;

    function handlePlant() {
        navigation.navigate(nextPage);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>

                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subTitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button onPress={handlePlant} title={buttonTitle} />
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    emoji: {
        fontSize: 78,
        textAlign: "center"
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: "center",
        color: colors.heading,
        lineHeight: 38,
        marginTop: 35
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: "center",
        fontSize: 17,
        paddingHorizontal: 20,
        color: colors.heading
    },
    footer: {
        paddingHorizontal: 70,
        justifyContent: "center",
        paddingVertical: 20
    }
});