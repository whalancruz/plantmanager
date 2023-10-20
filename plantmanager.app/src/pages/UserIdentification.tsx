import { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "../components/Button";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { StorageKeys } from "../enums/storageKeys.enums";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import storage from "../utils/storage";

export function UserIndentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    async function handleSubmit() {
        if (!name) return;

        await storage.set(StorageKeys.plantmanager_user, name);
        
        navigation.navigate("UserCamera");
    };

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    };

    function handleInputFocus() {
        setIsFocused(true);
    };

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

                    <View style={styles.content}>
                        <View style={styles.form}>

                            <Text style={styles.emoji}>
                                {isFilled ? '😁' : '😃'}
                            </Text>

                            <Text style={styles.title}>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>

                            <TextInput
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                                style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]}
                                placeholder="Digite um nome" />

                            <View style={styles.footer}>
                                <Button onPress={handleSubmit} title="Confirmar" style={styles.buttonAvancar} />
                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignContent: "space-around",
        paddingHorizontal: 35
    },
    content: {
        flex: 1,
        width: "100%"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emoji: {
        fontSize: 44,
        paddingVertical: 10
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontFamily: fonts.heading,
        lineHeight: 32
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        color: colors.heading,
        width: "100%",
        marginTop: 50,
        textAlign: "center",
        fontSize: 17,
        paddingVertical: 5
    },
    footer: {
        width: "100%",
        paddingHorizontal: 20,
    },
    buttonAvancar: {
        marginTop: 30,
        width: "100%"
    }
});

