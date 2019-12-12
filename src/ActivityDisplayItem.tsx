/**
 *
 */
import React from "react"
import { IActivity } from "./interfaces";

type Props = {
    selectedActivity: ( IActivity | null );
}

const ActivityDisplayItem = ( { selectedActivity }: Props) => {
    let display = ( selectedActivity ) ?
        <div></div>
        :
        <h4>Please fill out an activity</h4>;

    return ( <div>{display}</div> )
}

export default ActivityDisplayItem;