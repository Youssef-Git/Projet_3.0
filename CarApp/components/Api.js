import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { Card, Button } from '@rneui/themed';
import axios from 'axios';


    const Api = () => {
    const [backendMessage, setBackendMessage] = useState([]);

    useEffect(() => {
        // Appel de l'API backend
        axios.get('http://10.74.3.159:3000/ride')
        .then((response) => {
            setBackendMessage(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);


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

                        <Text style={styles.boldText}>Localisation :</Text>

                        <Text style={styles.boldText}>Latitude:

                        <Text style={styles.normalText}>

                            {reponse.localisation.latitude}

                        </Text>

                        </Text>

                        <Text style={styles.boldText}>Longitude:

                        <Text style={styles.normalText}>

                            {reponse.localisation.longitude}

                        </Text>

                        </Text>

                    </View>

                    </View>

                </View>
{/* 
                <View style={styles.column}>

                    <Text style={styles.boldText}>Description :

                    <Text style={styles.normalText}>{reponse.description}</Text>

                    </Text>

                </View> */}

                </View>

            </View>

            </View>

            <Card.Divider />

            <View style={styles.styleBtn}>

            {/* <Button

                title="Réservation"

                onPress={navigationAgenda}

            > */}
            <Button>
                Réserver

            </Button>

            {/* <Text style={styles.Home}>

                <FontAwesome name="star" size={24} color="black" />

            </Text> */}

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
