import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export default function DetailsScreen({ navigation, route }) {
    const { selectedDay, description, color, legendTag, icon, link} = route.params;

    // Correct the off-by-one error in the date and format it
    const correctedDate = new Date(selectedDay);
    correctedDate.setDate(correctedDate.getDate() + 1);
    const formattedDate = correctedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
        <View style={[styles.detailsScreenContainer, { backgroundColor: color }]}>
            <View style={styles.legendTagContainer}>
                <View style={styles.detailsHeader}>
                    <Text
                        style={styles.legendTagText}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {legendTag}
                    </Text>
                </View>
            </View>

            <View style={styles.dateContainer}>
                <Icon name="calendar" type="font-awesome" size={20} color="white" />
                <Text style={styles.dateText}>{formattedDate}</Text>
                <Icon name="bell" type="font-awesome" size={20} color="white" />
                <Text style={styles.dateText}>Set Reminder</Text>
            </View>

            <View style={styles.iconContainer}>
                <Image
                    style={styles.icon}
                    source={{ uri: icon }}
                />
            </View>
            <ScrollView style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.returnButton} onPress={() => Linking.openURL(link)}>
                <Text style={styles.returnButtonText}>Learn More</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsHeader: {
      width: '100%',
      borderBottomWidth: 1,
      paddingBottom: 5,
      paddingLeft: 20,
    },
    iconContainer: {
      justifyContent: 'center',
      width: '100%',
      aspectRatio: 2,
      padding: 10,
    },
    icon: {
      borderRadius: 50,
      flex: 1,
      resizeMode: 'cover'
    },
    legendWrapper: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 20,
    },
    jumpToTodayButton: {
      backgroundColor: '#FFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      position: 'absolute', // <-- Add this
      bottom: 20, // <-- Add this, adjust as needed
      right: 20, // <-- Add this, adjust as needed
    },
  
    jumpToTodayButtonText: {
      color: '#000',
      fontSize: 16,
    },
    detailsScreenContainer: {
      flex: 1,
    },
    legendTagContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    legendTagText: {// details title
      fontSize: 50,
      fontWeight: 'bold',
      color: 'white',
      overflow: 'hidden',
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingLeft: 20,
    },
    dateText: {
      paddingLeft: 10,
      fontSize: 10,
      color: 'white',
      paddingRight: 10
    },
    descriptionContainer: {
      flex: 1,
      marginBottom: 10,
      padding: 20
    },
    descriptionText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'justify'
    },
    returnButton: {
      alignSelf: 'center',
      marginBottom: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    returnButtonText: {
      fontSize: 16,
      color: 'black',
    },
    legendContainer: {
      flexDirection: 'row',
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      alignItems: 'flex-start',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      bottom: 55,
      flexWrap: 'wrap',
      marginLeft: 10,
      marginRight: 10,
    },
    legendTitle: {
      color: 'black',
      fontWeight: 'bold',
    },
    legendItemContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    legendColorDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 5
    },
    legendColorLabel: {
      fontSize: 12,
      // whiteSpace: 'nowrap', // <-- Prevent text from breaking to the new line
    },
    jumpToTodayText: {
      fontSize: 16,
      color: 'black',
    },
    legendColorDotWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
    },
  });
  