import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';


export default function DetailsScreen({ route }) {
    const { selectedDay, description, color, legendTag, icon,link,title } = route.params;

    const correctedDate = new Date(selectedDay);
    correctedDate.setDate(correctedDate.getDate() + 1);
    const formattedDate = correctedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
        <View style={[styles.detailsScreenContainer, { backgroundColor: color }]}>
            <Swiper showsButtons={false} loop={false} activeDotColor="white">
                <View style={styles.slide}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: icon }}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                            <View style={styles.dateContainer}>
                                <Icon name="calendar" type="font-awesome" size={20} color="white" />
                                <Text style={styles.dateText}>{formattedDate}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.infoIcon} onPress={() => Linking.openURL(link)}>
                            <Icon name="info" type="font-awesome" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={[styles.descriptionContainer, { backgroundColor: color }]}>  
                        <Text style={styles.descriptionText}>{description}</Text> 
                    </View>
                </View>
                
            </Swiper>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsScreenContainer: {
        flex: 1,
        padding: 10,
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    titleContainer: {
        position: 'absolute',
        left: 10,
        bottom: 40,
        padding: 5,
        borderRadius: 5,
    },
    titleText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },
    dateText: {
        fontSize: 20,
        color: 'white',
        left: 10,
    },
    infoIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
    },
    descriptionContainer: {
        borderRadius: 15,
        padding: 10,
    },
    descriptionText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Verdana',
        lineHeight: 24,
        marginBottom: 10,
    },    
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
});

