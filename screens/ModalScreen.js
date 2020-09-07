import * as React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { useUsers } from "../context/UsersProvider";

export const ModalScreen = () => {
    const navigation = useNavigation();
    const { params: { userId } } = useRoute();
    const [{ selectedUser, gettingUser }, dispatch] = useUsers();

    const closeModal = () => { navigation.navigate("Home") }

    const handleChange = (inputName) => ({ nativeEvent: { text } }) => {
        if (!selectedUser) return;
        dispatch.updateUser({ ...selectedUser, [inputName]: text });
    }

    React.useEffect(() => {
        if (!Object.keys(selectedUser).length) {
            dispatch.getUser(userId)
        }
    }, []);

    return (
        <Modal
            style={ styles.containerWrapper }
            transparent={ true }
        >
            <View style={ styles.container }>
                <Button title="Close modal" onPress={ closeModal } />
                <View style={ styles.contentContainer }>
                    {
                        gettingUser ?
                            <Text>Loading....</Text> :
                            <>
                                <TextInput
                                    onChange={ handleChange("first_name") }
                                    value={ selectedUser?.first_name }
                                />
                                <TextInput
                                    onChange={ handleChange("last_name") }
                                    value={ selectedUser?.last_name }
                                />
                                <TextInput
                                    onChange={ handleChange("email") }
                                    value={ selectedUser?.email }
                                />

                            </>
                    }
                </View>
            </View>
        </Modal>
    );
}

ModalScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    containerWrapper: {
        position: "absolute",
        right: 0,
    },
    container: {
        height: 350,
        backgroundColor: '#fff'
    },
    card: {
        margin: 20,
        padding: 30,
        borderWidth: 1,
        borderColor: "#909090"
    },
    contentContainer: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
        paddingBottom: 50
    }
});
