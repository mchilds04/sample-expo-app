import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
    Button,
    Image,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Auth, API } from "aws-amplify";
import { useUsers } from "../context/UsersProvider";

const updateUser = async (params) => {
    const response = await API.post("DemoAPI", '/demo/users/update', params)
    return response;
};

export default function UpdateUserScreen() {
    const [users, dispatch] = useUsers();
    console.log("SEARCH USERS: ", users)
    const signout = async () => {
        await Auth.signOut();
    };

    const onUpdate = (params) => {
        updateUser(params)
            .then((data) => console.log("Update: ", data))
            .catch((error) => console.log("Error updating user. ", error))
    }

    return (
        <View style={ styles.container }>
            <ScrollView
                style={ styles.container }
                contentContainerStyle={ styles.contentContainer }
            >
                <Button
                    title="Sign Out"
                    onPress={ signout }
                />
                <View style={ { height: 40 } }>

                </View>
            </ScrollView>


        </View>
    );
}

UpdateUserScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
