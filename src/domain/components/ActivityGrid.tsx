/**
 * Component used to display the activity history
 */
import React from "react"
import { IActivity } from "../interfaces";
import ActivityGridItem from "./ActivityGridItem";
import "./styles/ActivityGrid.css"

type Props = {
    displayActivities : Array<IActivity>;
    headers : string[],
    selectedActivity : (string | null);
    setSelectedActivity : ( id : string ) => void;
    timerStartHandler : ( id : string ) => void;
}

const ActivityGrid = ({ displayActivities, selectedActivity, setSelectedActivity, headers, timerStartHandler } : Props) =>
    <div className="activity-grid-container app-container-item">
        <table className="activity-grid-table">
            <thead className="activity-grid-table-header">
                <tr>
                    {headers.map( (header: string, index: number) => <th key={`activity-header-${index + 1}`}>{header}</th> )}
                </tr>
            </thead>
            <tbody className="activity-grid-table-body">
                {displayActivities.map(
                    (activity: IActivity) =>
                        <ActivityGridItem
                            key={`activity-grid-item-${activity.id}`}
                            selectionHandler={setSelectedActivity}
                            timerStartHandler={timerStartHandler}
                            selectedActivity={selectedActivity}
                            {...activity}/> )}
            </tbody>
        </table>
    </div>

export default ActivityGrid