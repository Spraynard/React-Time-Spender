/**
 * Component used to display the selected activity.
 */
import React from "react"
import { IActivity } from "./interfaces"

type Props = {
    children: React.ReactNode;
    activities: Array<IActivity>;
    setActivities: ( activties: Array<IActivity> ) => void
}

const ActivityDisplay = ({ children } : Props) => {
    return (
        <div className="activity-display app-container-item">
            {children}
        </div>
    )
}

export default ActivityDisplay