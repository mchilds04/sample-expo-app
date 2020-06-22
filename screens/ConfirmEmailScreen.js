import * as React from 'react';
import * as ReactNative from 'react-native';

import { Auth } from "aws-amplify";
import { useNavigation, useRoute } from "@react-navigation/native";

export const ConfirmEmailScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const [input, setInput] = React.useState({
        code: "",
        email: params?.email || ""
    });

    const [inputStatus, setStatus] = React.useState("");

    const onInput = (inputKey) => ({ nativeEvent }) => {
        console.log(inputKey, nativeEvent.text)
        setInput({ ...input, [inputKey]: nativeEvent.text })
    };

    const onConfirmEmail = (email, code) => {
        console.log("CODE: ", code)
        setStatus("SUBMITTING");
        Auth.confirmSignUp(email, code)
            .then((authData) => {
                navigation.navigate("SignIn", { email });
                setStatus("");
            })
            .catch((error) => {
                console.info("Error signing up: ", error);
                setStatus("ERROR");
            });
    };

    return (
        <ReactNative.View style={ styles.authContainer }>
            <ReactNative.TextInput
                accessibilityLabel="Email address"
                onChange={ onInput("email") }
                contentContainerStyle={ styles.authInputContainer }
                style={ styles.authInput }
                placeholder="Email"
                value={ input.email }
            />

            <ReactNative.TextInput
                accessibilityLabel="Verification code"
                onChange={ onInput("code") }
                contentContainerStyle={ styles.authInputContainer }
                style={ styles.authInput }
                placeholder="Verification code"
                textContentType="telephoneNumber"
                value={ input.code }
            />
            {
                inputStatus === "ERROR" &&
                <ReactNative.Text>
                    Error confirming up. Please try again.
                </ReactNative.Text>
            }
            <ReactNative.Button
                accessibilityLabel="Sign up button"
                title={
                    inputStatus === "SUBMITTING" ? "Loading....." : "Confirm Email"
                }
                disabled={ inputStatus === "SUBMITTING" }
                onPress={ () => onConfirmEmail(input.email, input.code) }
            />
        </ReactNative.View>
    );
};

const styles = ReactNative.StyleSheet.create({
    authContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff"
    },
    authInput: {
        height: 50,
        marginBottom: 15,
        paddingLeft: 15,
        borderWidth: 2,
        borderColor: "#909090"
    }
});