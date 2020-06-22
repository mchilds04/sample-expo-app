import * as React from 'react';
import * as ReactNative from 'react-native';

import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

export const SignUpScreen = () => {
    const navigation = useNavigation();

    const [input, setInput] = React.useState({ email: "", password: "" });
    const [inputStatus, setStatus] = React.useState("");

    const onInput = (inputKey) => ({ nativeEvent }) => {
        console.log(inputKey, nativeEvent.text)
        setInput({ ...input, [inputKey]: nativeEvent.text })
    };

    const onSignUp = (email, password) => {
        setStatus("SUBMITTING");
        Auth.signUp({ username: email, password })
            .then((authData) => {
                navigation.navigate("ConfirmEmail", { email });
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
            />
            <ReactNative.TextInput
                accessibilityLabel="Password"
                onChange={ onInput("password") }
                contentContainerStyle={ styles.authInputContainer }
                style={ styles.authInput }
                textContentType="password"
                placeholder="Password"
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
                    inputStatus === "SUBMITTING" ? "Loading....." : "Sign Up"
                }
                disabled={ inputStatus === "SUBMITTING" }
                onPress={ () => onSignUp(input.email, input.password) }
            />


            <ReactNative.Text
                onPress={ () => navigation.navigate("SignIn") }
                style={ styles.clickableText }
            >
                Sign In
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