import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, Dimensions, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';


export default function DetailsScreen({ route }) {
  const theme = useColorScheme()
  const { selectedDay, description, color, legendTag, icon, link, title } = route.params;
  const [imageLoadError, setImageLoadError] = React.useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const correctedDate = new Date(selectedDay);
  correctedDate.setDate(correctedDate.getDate() + 1);
  const formattedDate = correctedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const text = description.replace(/\\n/g, '\n');

  return (
    <View style={[styles.detailsScreenContainer, { backgroundColor: '#363636' }]}>
      <Swiper showsButtons={false} loop={false} activeDotColor="white">
        <View style={styles.imageContainer}>
          {imageLoadError ? (
            <View style={[styles.image, { backgroundColor: 'gray' }]} />
          ) : (
            <Image
              style={styles.image}
              source={{ uri: icon }}
              onError={handleImageError}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.dateContainer}>
              <Icon name="calendar" size={20} color="white" />
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.infoIcon} onPress={() => Linking.openURL(link)}>
            <Icon name="info" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={theme == 'light' ? styles.descriptionContainerLight : styles.descriptionContainerDark}>
          <Text style={theme == 'light' ? styles.descriptionTitleLight : styles.descriptionTitleDark}>{title}</Text>
          <ScrollView>
            <Text style={theme == 'light' ? styles.descriptionTextLight : styles.descriptionTextDark}>{text}</Text>
          </ScrollView>
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow radius
  },
  dateText: {
    fontSize: 20,
    color: 'white',
    left: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow radius
  },
  infoIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 17.5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainerLight: {
    borderRadius: 15,
    padding: 10,
    height: '100%',
    backgroundColor: '#FFF'
  },
  descriptionContainerDark: {
    borderRadius: 15,
    padding: 10,
    height: '100%',
    backgroundColor: '#212226'
  },
  descriptionTextLight: {
    fontSize: 19,
    color: 'grey',
    fontFamily: 'Roboto',
    lineHeight: 35,
    marginBottom: 10,
  },
  descriptionTextDark: {
    fontSize: 19,
    color: '#d1d1d1',
    fontFamily: 'Roboto',
    lineHeight: 35,
    marginBottom: 10,
  },
  descriptionTitleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontSize: 35
  },
  descriptionTitleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontSize: 35
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

