import { View, StyleSheet } from "react-native";

import LoottieView from "lottie-react-native";
import LottieAnimation from "../assets/load.json";

export function Load() {
    return (
        <View style={styles.container}>
            <LoottieView style={styles.animation} source={LottieAnimation} autoPlay loop />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    animation: {
        backgroundColor: "transparent",
        width: 200,
        height: 200
    }
});