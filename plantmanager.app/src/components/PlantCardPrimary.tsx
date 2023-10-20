import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import { IPlantCardPrimary } from "../interfaces/plant.interfaces";

import colors from "../styles/colors";
import fonts from "../styles/fonts";


export function PlantCardPrimary({ data, ...res }: IPlantCardPrimary) {
    return (
        <RectButton style={styles.container} {...res}>
            <SvgFromUri uri={data.photo} width={120} height={120} />
            <Text style={styles.text}>{data.name}</Text>
        </RectButton>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
        textAlign: "center"
    }
});