/**
 * Returns a list of transformed objects from activities data.
 */
import { IActivity, IActivityDictionary } from "./interfaces"
import moment, { Duration } from "moment";

export const getActivitiesInDisplayOrder = (activities: string[], activities_data: IActivityDictionary):IActivity[] =>
    activities.map( (activity_id : string) => activities_data[activity_id]);

export const outputDate = (activityDate : (Date | null), fallback = "-"):string => {

    if ( ! activityDate )
    {
        return fallback;
    }

    let today = moment();
    let activityDay = moment(activityDate);
    let dateFormat = "hh:mm:ss A";

    // If we're not on the same day as when the activity was made
    if ( ! activityDay.isSame(today, 'd') )
    {
        dateFormat = `MMM/DD ${dateFormat}`
    }

    return activityDay.format(dateFormat);
}

const hoursSuffix = "h"
const minuteSuffix = "m"
const secondsSuffix = "s"

export const outputDuration = ( duration: Duration ):string => (duration.hours()) ?
    `${duration.hours()}${hoursSuffix} ${duration.minutes()}${minuteSuffix} ${duration.seconds()}${secondsSuffix}`
    :
    (duration.minutes()) ?
        `${duration.minutes()}${minuteSuffix} ${duration.seconds()}${secondsSuffix}`
        :
        `${duration.seconds()}${secondsSuffix}`

// One second
const DEFAULT_TICK_VALUE = 1000
export const startActivityTimer = ( id : string, timerTickHandler: (id:string) => void ): number => window.setInterval(() => timerTickHandler(id), DEFAULT_TICK_VALUE);
export const stopActivityTimer = ( timerID : (number | null) ) => {
    if ( ! timerID )
    {
        return null
    }

    window.clearInterval(timerID)
    return null
}

// Returns a copy of the activities dictionary
export const setActivitiesDataValue = ( id : string, key : string, value : any, activities : IActivityDictionary ): IActivityDictionary => ({
    ...activities,
    [id] : {
        ...activities[id],
        [ key ] : value
    }
});

/**
 * Given activity data, returns an activity data object with any active timer stopped.
 * Will supply an end date, and a null timerID.
 *
 * @param activitiesData An object structured as an IActivityDictionary
 */
export const stopAllActivityTimersAndReturnState =
    (activitiesData: IActivityDictionary): IActivityDictionary => Object.keys(activitiesData).reduce(
        (prev, current) => ({
            ...prev,
            [current]: {
                ...activitiesData[current],
                endDate: (!activitiesData[current].endDate) ? new Date() : activitiesData[current].endDate,
                timerID: (activitiesData[current].timerID) ? stopActivityTimer(activitiesData[current].timerID) : null
            }
        }), {});