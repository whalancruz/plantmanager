import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export interface ButtonProps extends TouchableOpacityProps {
    title: string;
};

export function Button({ title, style, ...res }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.container, style, (res.disabled ? styles.disabledButton : null)]} {...res} activeOpacity={0.7}>
            <Text style={[styles.text, (res.disabled ? styles.disabledButtonText : null)]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    },
    disabledButton: {
        opacity: 0.8,
        backgroundColor: colors.shape
    },
    disabledButtonText: {
        opacity: 0.3,
        color: colors.body_dark
    }
});