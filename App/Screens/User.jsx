import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';

export default function User({ navigation }) {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filteredData, setFilteredData] = useState(users);
  const [isOpenDetail, setIsOpenDetail] = useState({});

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
      setFilteredData(res.data);

      const initialOpenStatus = {};
      res.data.forEach(item => {
        initialOpenStatus[item.id] = false;
      });
      setIsOpenDetail(initialOpenStatus);
    }).catch((err) => console.log(err));
  }, []);

  const handleTextChange = (text) => {
    setKeyword(text);
    const newData = users.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.username.toUpperCase()} ${item.email.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  const handlePress = (id) => {
    setIsOpenDetail(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleViewMaps = (geo) => {
    navigation.navigate('Maps', { geo });
  };

  const renderUser = ({ item }) => {
    const formattedUsername = item.username.replace(/\./g, '_').toLowerCase();
    const profilePhotos = {
      bret: require('../../assets/bret.jpeg'),
      antonette: require('../../assets/antonette.jpeg'),
      samantha: require('../../assets/samantha.jpeg'),
      karianne: require('../../assets/karianne.jpeg'),
      kamren: require('../../assets/kamren.jpeg'),
      leopoldo_corkery: require('../../assets/leopodo_corkery.jpeg'),
      elwyn_skiles: require('../../assets/elwyn.skiles.jpeg'),
      maxime_nienow: require('../../assets/maxime_nienow.jpeg'),
      delphine: require('../../assets/delphine.jpeg'),
      moriah_stanton: require('../../assets/moriah.stanton.jpeg')
    };

    return (
      <TouchableOpacity style={styles.userContent} onPress={() => handlePress(item.id)}>
        <View style={styles.userInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={profilePhotos[formattedUsername.toLowerCase()]} style={styles.image} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.fontLarge}>{item.name}</Text>
              <Text>{'@' + item.username}</Text>
            </View>
          </View>
          {isOpenDetail[item.id] && (
            <View style={{ marginTop: 10, width: '100%' }}>
              <Text>{'Email             : ' + item.email}</Text>
              <Text>{'Address        : ' + item.address.street + ' ' + item.address.suite + ' ' + item.address.city}</Text>
              <Text>{'Postal Code : ' + item.address.zipcode}</Text>
              <Text>{'Long Lat       : ' + item.address.geo.lat + ' ' + item.address.geo.lng}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleViewMaps(item.address.geo)}>
                <Text style={styles.buttonText}>View Maps</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inlineContent}>
        <Text style={styles.textCenter}>Users </Text>
        <Text style={styles.textCenterGray}>{users.length}</Text>
      </View>
      <View style={styles.userContent}>
        <TextInput
          placeholder="Type here.."
          value={keyword}
          onChangeText={handleTextChange}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: '30%',
    marginTop: '5%'
  },
  userContent: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  inlineContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  fontLarge: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textCenter: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCenterGray: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c4bcbb',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  userInfo: {
    padding: 5,
    overflowWrap: 'break-word',
    width: '100%'
  },
  input: {
    fontSize: 17,
    width: '100%',
  },
  button: {
    backgroundColor: '#dad4d4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
