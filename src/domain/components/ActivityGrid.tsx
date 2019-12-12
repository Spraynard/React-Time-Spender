/**
 * Component used to display the activity history
 */
import React from "react"
import { IActivity } from "../interfaces";
import ActivityGridItem from "./ActivityGridItem";
import "./styles/ActivityGrid.css"

type Props = {
    displayActivities : Array<IActivity>;
    setSelectedActivity : ( id : string ) => void;
    headers : string[]
}

const ActivityGrid = ({ displayActivities, setSelectedActivity, headers } : Props) =>
    <div className="activity-grid-container app-container-item">
        <table className="activity-grid-table">
            <thead className="activity-grid-table-header">
                <tr>
                    {headers.map( (header: string) => <th>{header}</th> )}
                </tr>
            </thead>
            <tbody className="activity-grid-table-body">
                {displayActivities.map( (activity: IActivity) => <ActivityGridItem selectionHandler={setSelectedActivity} {...activity}/> )}
            </tbody>
        </table>
    </div>

export default ActivityGrid