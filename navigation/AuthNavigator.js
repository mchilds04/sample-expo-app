import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignUpScreen } from "../screens/SignupScreen";
import { ConfirmEmailScreen } from "../screens/ConfirmEmailScreen";
import { SignInScreen } from "../screens/SignInScreen";

const AuthStack = createStackNavigator();

export const AuthNavigator = ({ authState }) => (
    <AuthStack.Navigator initialRouteName="SignIn">
        <AuthStack.Screen name="SignUp" component={ SignUpScreen } />
        <AuthStack.Screen name="ConfirmEmail" component={ ConfirmEmailScreen } />
        <AuthStack.Screen name="SignIn" component={ SignInScreen } />
    </AuthStack.Navigator>
);