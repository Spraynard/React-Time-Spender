import React from "react"
import { outputDate, outputDuration, stopActivityTimer } from "../helpers"
import { Duration } from "moment"
import "./styles/ActivityGridItem.css";

type Props = {
    id: string;
    startDate: Date;
    endDate: (Date | null);
    duration: Duration;
    description: string;
    timerID: (number | null);
    selectedActivity : (string | null);
    selectionHandler : ( id : string ) => void;
    timerStartHandler: ( id : string ) => void;
}

const ActivityGridItem = ({ id, startDate, endDate, duration, description, timerID, selectedActivity, selectionHandler, timerStartHandler }: Props) => {

    // On componentDidMount and componentDidUnmount,
    // apply a timer and remove a timer respectively
    React.useEffect(() => {

        // Protects against starting timers when we load from Storage
        if ( !endDate )
        {
            timerStartHandler(id);
        }

        return () => { stopActivityTimer(timerID); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let isSelected = ( id === selectedActivity );

    return (
    <tr className={`activity-grid-item ${(isSelected) ? "selected" : ""}`} onMouseDown={() => selectionHandler(id)}>
        <td>{outputDate(startDate)}</td>
        <td>{outputDate(endDate)}</td>
        <td>{(! duration) ? "0s" : outputDuration(duration)}</td>
        <td>{description}</td>
    </tr>
    )

}

export default ActivityGridItem