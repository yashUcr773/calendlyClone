export interface MeetingFormData {
    location: string
    locationURL: string
    themeColor: string
    eventName: string
    duration: number
}

export interface MeetingEventItemType {
    location: string
    locationURL: string
    themeColor: string
    eventName: string
    duration: number
    createdBy: string
    id: string
}

export interface BusinessInfo {
    userName: string;
    daysAvailable: {
        [day: string]: boolean;
    };
    email: string;
    businessName: string;
    startTime: string;
    endTime: string;
}