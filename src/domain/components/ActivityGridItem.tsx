import React from "react"
import { getDateString } from "../helpers"
type Props = {
    id: string;
    startDate: Date;
    endDate: (Date | null);
    duration: number;
    description: string;
    selectionHandler : ( id : string ) => void
}

const ActivityGridItem = ({ id, startDate, endDate, duration, description, selectionHandler }: Props) =>
    <tr className="activity-grid-item" onMouseDown={() => selectionHandler(id)}>
        <td>{getDateString(startDate)}</td>
        <td>{getDateString(endDate)}</td>
        <td>{duration}</td>
        <td>{description}</td>
    </tr>

export default ActivityGridItem