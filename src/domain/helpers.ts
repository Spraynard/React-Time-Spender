/**
 * Returns a list of transformed objects from activities data.
 */
import { IActivity, IActivityDictionary } from "./interfaces"

export const getActivitiesInDisplayOrder = (activities: string[], activities_data: IActivityDictionary):IActivity[] =>
    activities.map( (activity_id : string) => activities_data[activity_id]);

const isSameDay = ( date1: Date, date2: Date): boolean => ( date1.getDate() !== date2.getDate() ) && ( date1.getMonth() !== date2.getMonth() )

export const getDateString = (activityDate : (Date | null), fallback = "-"):string => {
    let today = new Date();
    let datePrefix = "";

    if ( ! activityDate )
    {
        return fallback;
    }

    if ( ! isSameDay( activityDate, today ) )
    {
        let datePrefix = activityDate.toLocaleDateString("en-US");
    }

    let timeString = activityDate.toLocaleDateString("en-US", { hour : "numeric", minute : "numeric", second : "numeric" })

    return ( datePrefix ) ? `${datePrefix} ${timeString}` : `${timeString}`;
}