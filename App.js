import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import Amplify from "aws-amplify";
import { Authenticator } from "aws-amplify-react-native";

import { AuthNavigator } from './navigation/AuthNavigator';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { ModalNavigator } from "./navigation/ModalNavigator";

import config from "./aws-exports";
import { UsersProvider } from "./context/UsersProvider";

Amplify.configure(config);

const homeScreenOptions = {
  cardStyle: {
    backgroundColor: "transparent",
    bottom: 0,
    opacity: 1
  },
  cardOverlayEnabled: true,
  overlayStyle: {},
  tabBarVisable: false
};

const Stack = createStackNavigator();

const AppContainer = ({ authData, authState }) => {

  return (
    <Stack.Navigator screenOptions={ homeScreenOptions }>
      {
        authState === "signedIn" ?
          <Stack.Screen
            name="Root"
            component={ BottomTabNavigator }
          /> :
          <Stack.Screen
            name="Auth"
            children={ () => AuthNavigator(authState) }
            options={ { headerShown: false } }
          />
      }
      <Stack.Screen
        name="DetailsModal"
        component={ ModalNavigator }
        options={ { headerShown: false } }
      />
    </Stack.Navigator>
  );
};

export default function App(props) {
  return (
    <UsersProvider>
      <View style={ styles.container }>
        <NavigationContainer linking={ LinkingConfiguration }>
          <Authenticator hideDefault={ true } container={ false }>
            <AppContainer />
          </Authenticator>
        </NavigationContainer>
      </View>
    </UsersProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
