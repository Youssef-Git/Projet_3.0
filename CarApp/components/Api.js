import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Card, Button } from '@rneui/themed';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


    const Api = () => {
    const [backendMessage, setBackendMessage] = useState([]);
    const navigation = useNavigation();
    

    useEffect(() => {
        // Appel de l'API backend
        axios.get('http://192.168.1.12:3000/ride')
        .then((response) => {
            setBackendMessage(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    // const handleBookClick = () => {
    //     navigation.navigate('Book');
    // };

    const handleBookClick = (marque, id) => {
        navigation.navigate('Book', { marque: marque, id: id });
    };


return (

    <View style={styles.container}>

    <ScrollView>

        {backendMessage.map((reponse) => (

        <Card key={reponse.id}  style={styles.styleCard}>

            <Card.Title style={styles.Title}>{reponse.marque}</Card.Title>

            <Card.Divider />

            <View style={styles.container}>

            <View style={styles.row}>

                <View style={styles.column}>

                <View style={styles.column}>

                    <View style={styles.row}>

                    <View style={styles.column}>

                        <Image source={{ uri: reponse.image }} style={styles.image} />

                    </View>

                    <View style={styles.column}>

                        <Text style={styles.boldText}>ID :

                        <Text style={styles.normalText}> {reponse.id}</Text>

                        </Text>

                        <Text style={styles.boldText}>Modèle :

                        <Text style={styles.normalText}>{reponse.modele}</Text>

                        </Text>

                        <Text style={styles.boldText}>Transmission :

                        <Text style={styles.normalText}> {reponse.transmission}</Text>

                        </Text>

                        <Text style={styles.boldText}>Annee :

                        <Text style={styles.normalText}>{reponse.annee}</Text>

                        </Text>

                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: reponse.localisation.latitude,
                                longitude: reponse.localisation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            >
                            <Marker
                                coordinate={{
                                latitude: reponse.localisation.latitude,
                                longitude: reponse.localisation.longitude,
                                }}
                                title={reponse.marque}
                                description={reponse.modele}
                            />
                        </MapView>

                    </View>

                    </View>

                </View>

                </View>

            </View>

            </View>

            <Card.Divider />

            <View style={styles.styleBtn}>

            <View style={styles.styleBtn}>

            {/* <Button onPress={handleBookClick}>Réserver</Button> */}
            <Button onPress={() => handleBookClick(reponse.marque, reponse.id)}>Réserver</Button>

            </View>

            </View>

        </Card>

        ))}

        <StatusBar style="auto" />

    </ScrollView>

    </View>

);

};

export default Api;

const styles = StyleSheet.create({

    map: {
        flex: 1,
        height: 200,
        marginVertical: 10,
    },

    image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'relative'

    },

    container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',

    },

    row: {

    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,

    },

    column: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: 'white',
    padding: 1,

    },

    navbar: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'grey',
    justifyContent: 'space-evenly',
    borderRadius: 40,

    },

    Home: {
    textAlign: 'center',
    width: '100%',

    },

    IconStyle: {
    padding: 14,

    },

    TextInput: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,

    },

    styleCard: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 10,
    padding: 15,
    marginRight: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',

    },

    styleBtn: {
    width: '100%',
    flexDirection: 'row',

    },

    Title: {
    fontSize: 10,

    },

    normalText: {
    fontWeight: 'normal',
    fontSize: 10,

    },

    boldText: {
    fontWeight: "bold",
    fontSize: 10,
    },

});
