import * as React from 'react';
import * as ReactNative from 'react-native';

import { Auth } from "aws-amplify";
import { useRoute } from "@react-navigation/native";

export const SignInScreen = () => {
    const { params } = useRoute();

    const [input, setInput] = React.useState({
        email: params?.email || "rojolem752@kewrg.com",
        password: "password"
    });
    const [inputStatus, setStatus] = React.useState("");

    const onInput = (inputKey) => ({ nativeEvent }) => {
        console.log(inputKey, nativeEvent.text)
        setInput({ ...input, [inputKey]: nativeEvent.text })
    };

    const onSignIn = (email, password) => {
        setStatus("SUBMITTING");
        Auth.signIn({ username: email, password })
            .then((authData) => setStatus(""))
            .catch((error) => {
                console.info("Error signing up: ", error);
                setStatus("ERROR");
            });
    };

    return (
        <ReactNative.View style={ styles.authContainer }>
            <ReactNative.TextInput
                accessibilityLabel="Email address"
                contentContainerStyle={ styles.authInputContainer }
                onChange={ onInput("email") }
                placeholder="Email"
                style={ styles.authInput }
                value={ input.email }
            />
            <ReactNative.TextInput
                accessibilityLabel="Password"
                contentContainerStyle={ styles.authInputContainer }
                onChange={ onInput("password") }
                placeholder="Password"
                style={ styles.authInput }
                textContentType="password"
                value={ input.password }
            />
            {
                inputStatus === "ERROR" &&
                <ReactNative.Text>
                    Error signing up. Please try again.
                </ReactNative.Text>
            }
            <ReactNative.Button
                accessibilityLabel="Sign up button"
                title={
                    inputStatus === "SUBMITTING" ? "Loading....." : "Sign In"
                }
                disabled={ inputStatus === "SUBMITTING" }
                onPress={ () => onSignIn(input.email, input.password) }
            />

            <ReactNative.Text
                onPress={ () => navigation.navigate("SignUp") }
                style={ styles.clickableText }
            >
                Sign Up
            </ReactNative.Text>

            <ReactNative.Text
                onPress={ () => navigation.navigate("ConfirmEmail") }
                style={ styles.clickableText }
            >
                Confirm Email
            </ReactNative.Text>
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
    },
    clickableText: {
        fontSize: 16,
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 30
    }
});