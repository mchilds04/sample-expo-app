import * as React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Auth } from "aws-amplify";
import { useNavigation } from '@react-navigation/native';

import { getUsers } from "../services/usersService";
import { useUsers } from "../context/UsersProvider";

export default function HomeScreen() {
  const [{ users }, dispatch] = useUsers();
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const signout = async () => {
    await Auth.signOut();
  };

  React.useEffect(() => {
    (async () => {
      const users = await getUsers();
      dispatch.updateUserList(users);
    })();
  }, []);

  return (
    <View style={ styles.container }>
      <Button title="Sign Out" onPress={ signout } />

      <View style={ styles.contentContainer }>
        { !users.length ?
          <Text style={ { fontSize: 24 } }>Loading......</Text> :
          <FlatList
            data={ users }
            keyExtractor={ (item) => item.id.toString() }
            renderItem={ ({ item, index }) =>
              <UserCard info={ item } key={ index } />
            }
            refreshing={ refreshing }
            onRefresh={ onRefresh }
          />
        }
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const UserCard = ({ info }) => {
  const navigation = useNavigation();
  return (
    <View style={ styles.card }>
      <TouchableOpacity
        style={ styles.textContainer }
        onPress={
          () => {
            navigation.navigate("DetailsModal", { userId: info.id })
          }
        }>
        <Text>{ info.first_name } { info.last_name }</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    minWidth: "85%",
    height: "auto",
    margin: 10,
    borderWidth: 1,
    borderColor: "#909090"
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 50
  },
  textContainer: {
    padding: 30
  }
});
