/**
 * Functions that will transform our application data for use in a Storage object (i.e. sessionStorage, localStorage)
 */
import { IActivityDictionary, IActivity, IActivitySerialized } from "./interfaces";

const serializeActivity = ( activity : IActivity ): IActivitySerialized => ({
        ...activity,
        startDate: activity.startDate.toISOString(),
        endDate: (activity.endDate) ? (activity.endDate.toISOString()) : null,
        duration: activity.duration.asSeconds()
    });

/**
 * Converts activity data to an object that can be stored in sessionStorage
 * @param data Activity Data
 */
export const serializeActivityData = ( data : IActivityDictionary ): string => {
    let transformedData: { [key: string] : any } = { ...data };

    for ( let key in transformedData ) {
        transformedData = {
            ...transformedData,
            [ key ] : { ...serializeActivity(data[key]) }
        }
    }
    return JSON.stringify(transformedData)
}
export const serializeActivities = ( activities : string[] ): string => JSON.stringify(activities);
export const serializeString = ( value : string ): string => JSON.stringify(value);