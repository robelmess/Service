import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

const getToken = async () => {
    try {
        const token = await firebase.messaging().getToken();
        if (token) return token;
    } catch (error) {
        console.log(error);
    }
};

export const getFCMToken = async () => {
    try {
        const authorized = await firebase.messaging().hasPermission();
        const fcmToken = await getToken();

        if (authorized) return fcmToken;

        await firebase.messaging().requestPermission();
        return fcmToken;
    } catch (error) {
        console.log(error);
    }
};

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification
        )
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage = {
            if(remoteMessage) {
                console.log(
                    'notification caused app to open from quit state:',
                    remoteMessage.notification
                )
            }
        })
    messaging().onMessage(async remoteMessage => {
        console.log("notification on foreground state...", remoteMessage)
    })
}