/**
 * Create domain objects from sessionStorage serialized data.
*/

import { IActivityDictionary, IActivity, IActivitySerialized } from "./interfaces";
import moment from "moment";

const unserializeActivity = (activity: IActivitySerialized): IActivity => ({
        ...activity,
        startDate: new Date(activity.startDate),
        endDate: (activity.endDate) ? new Date(activity.endDate) : null,
        duration: moment.duration(activity.duration, 's')
    });

/**
 * Convert a serialized Activity dictionary to an unserialized one!!!
 * @param data Activity Data
 */
export const unserializeActivityData = (data: string): IActivityDictionary => {
    let unserialized = JSON.parse(data);

    for (let key in unserialized) {
        unserialized = {
            ...unserialized,
            [ key ] : { ...unserializeActivity(unserialized[key]) }
        }
    }
    return unserialized;
}

export const unserializeActivities = (serializedActivities: string): string[] => JSON.parse(serializedActivities);
export const unserializeString = (value: string): string => JSON.parse(value);