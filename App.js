import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

import Amplify from "aws-amplify";
import { Authenticator } from "aws-amplify-react-native";

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { SignUpScreen } from "./screens/SignupScreen";
import { ConfirmEmailScreen } from "./screens/ConfirmEmailScreen";
import { SignInScreen } from "./screens/SignInScreen";
import config from "./aws-exports";

Amplify.configure(config);

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

const AuthNavigation = ({ authState }) => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignUp" component={ SignUpScreen } />
    <AuthStack.Screen name="ConfirmEmail" component={ ConfirmEmailScreen } />
    <AuthStack.Screen name="SignIn" component={ SignInScreen } />
  </AuthStack.Navigator>
);

const AppContainer = ({ authData, authState }) => {
  const AuthNavigationWithProps = () =>
    <AuthNavigation authState={ authState } />
  return (
    <React.Fragment>
      <Stack.Navigator>
        {
          authState === "signedIn" ?
            <Stack.Screen name="Root" component={ BottomTabNavigator } /> :
            <Stack.Screen
              name="Auth"
              component={ AuthNavigationWithProps }
              options={ { headerShown: false } }
            />
        }
      </Stack.Navigator>
      <View style={ { backgroundColor: "#000", padding: 10 } }>
        <Text style={ { color: "white", fontSize: 16, textAlign: "center" } }>
          AUTH STATE: { authState }
        </Text>
      </View>
    </React.Fragment>
  );
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={ styles.container }>
        { Platform.OS === 'ios' && <StatusBar barStyle="dark-content" /> }
        <NavigationContainer linking={ LinkingConfiguration }>
          <Authenticator hideDefault={ true } container={ false }>
            <AppContainer />
          </Authenticator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
