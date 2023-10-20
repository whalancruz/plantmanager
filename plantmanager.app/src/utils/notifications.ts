import { Platform } from "react-native";

import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';

export const NotificationsCustom = {
    emit: async (nextTime: Date, content: Notifications.NotificationContentInput) => {
        const seconds = Math.abs(Math.ceil(new Date().getTime() - nextTime.getTime()) / 1000);

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        let notificationID = await Notifications.scheduleNotificationAsync({
            content: content,
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true,
            }
        })

        return notificationID;
    },
    remove: async (notificationID: string) => {
        await Notifications.cancelScheduledNotificationAsync(notificationID);
    },
    permissions: async () => {

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250]
          });
        }
    
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          if (existingStatus !== 'granted') await Notifications.requestPermissionsAsync();
          await Notifications.getExpoPushTokenAsync({ projectId: "d4770663-c7ec-45b6-a5f0-ab40e3b68837" });
        };

    }
}

export default NotificationsCustom;