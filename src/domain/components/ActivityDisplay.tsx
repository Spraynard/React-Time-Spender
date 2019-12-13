/**
 *
 */
import React from "react"
import { IActivity } from "../interfaces";
import { outputDuration, outputDate } from "../helpers";
import "./styles/ActivityDisplay.css";

type Props = {
    selectedActivity: ( IActivity | null );
    timerResumeHandler: ( id : string ) => void;
    timerStopHandler: ( id : string ) => void;
    activityRemoveHandler: ( id : string ) => void;
}

const ActivityDisplay = ( { selectedActivity, timerResumeHandler, activityRemoveHandler, timerStopHandler }: Props) => ( selectedActivity ) ?
        <div className="activity-display">
            <h1>Selected Activity</h1>
            <h4>Duration: {outputDuration(selectedActivity.duration)}</h4>
            <h4>Start: {outputDate(selectedActivity.startDate)}</h4>
            <h4>End: {outputDate(selectedActivity.endDate)}</h4>
            <h4>Description: {selectedActivity.description}</h4>
            {(selectedActivity.endDate) ?
                <button onMouseDown={() => timerResumeHandler(selectedActivity.id)}>Start Another Session</button>
                :
                <button onMouseDown={() => timerStopHandler(selectedActivity.id)}>Stop Timing</button>}
            <button onMouseDown={() => activityRemoveHandler(selectedActivity.id)}>Remove Activity</button>
        </div>
        :
        <h4 className="activity-display">Please fill out an activity</h4>;

export default ActivityDisplay;