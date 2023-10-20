import { StyleSheet, Text, View, Animated } from "react-native";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import { IPlantCardSecondary } from "../interfaces/plant.interfaces";
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";

import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function PlantCardSecondary({ data, handleRemove, ...res }: IPlantCardSecondary) {
    return (
        <Swipeable overshootLeft={false} renderRightActions={() => (
            <Animated.View>
                <View>
                    <GestureHandlerRootView>
                        <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                            <Feather name="trash" size={27} color={colors.white} />
                        </RectButton>
                    </GestureHandlerRootView>
                </View>
            </Animated.View>)}>
            <RectButton style={styles.container} {...res}>

                <View style={styles.containerLeft}>
                    <SvgFromUri uri={data.photo} width={60} height={60} />
                    <Text style={styles.titleLeft}>{data.name}</Text>
                </View>

                <View style={styles.containerRigth}>
                    <Text style={styles.titleRigth}>Regar ás</Text>
                    <Text style={styles.subTitleRigth}>{format(new Date(data.dateTimeNotification), "HH:mm")}</Text>
                </View>

            </RectButton>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginVertical: 5
    },
    titleLeft: {
        fontFamily: fonts.heading,
        fontSize: 17,
        marginLeft: 12
    },
    containerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerRigth: {
        marginRight: 13
    },
    titleRigth: {
        color: colors.heading,
        fontFamily: fonts.complement,
        textAlign: "right",
        opacity: 0.8
    },
    subTitleRigth: {
        fontFamily: fonts.heading,
        color: colors.heading,
        textAlign: "right"
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 8,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    }
});