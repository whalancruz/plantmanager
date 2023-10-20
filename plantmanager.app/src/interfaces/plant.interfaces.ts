import { RectButtonProps } from "react-native-gesture-handler";

export interface IPlant {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    },
    dateTimeNotification: string;
    notificationId: string;
}

export interface IPlantCardPrimary extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export interface IPlantCardSecondary extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        dateTimeNotification: string;
    },
    handleRemove: () => void;
}