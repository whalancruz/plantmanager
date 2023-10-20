import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export interface EnvirimentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({ title, active, ...res }: EnvirimentButtonProps) {
    return (
        <RectButton style={[styles.content, active && styles.contentActive]} {...res}>
            <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
        </RectButton>
    )
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: colors.shape,
        height: 50,
        width: 110,
        paddingHorizontal: 20,
        borderRadius: 12,
        justifyContent: "center",
        alignContent: "center",
        marginRight: 5
    },
    contentActive: {
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 16,
        textAlign: "center"
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
});