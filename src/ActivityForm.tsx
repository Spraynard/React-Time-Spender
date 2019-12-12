import React from "react";
import "./css/ActivityForm.css";

type Props = {
    handleSubmit: (event : React.FormEvent<HTMLFormElement>) => void;
    activityFormDescription: string;
    setActivityFormDescription: (description: string) => void;
}

const ActivityForm = ({ handleSubmit, activityFormDescription, setActivityFormDescription }: Props) =>
    <form onSubmit={handleSubmit} className="activity-form">
        <label htmlFor="activity-description">Description</label>
        <textarea
            id="activity-description"
            className="activity-description"
            name="activity-description"
            onChange={e => setActivityFormDescription(e.target.value)}
            value={activityFormDescription}
        ></textarea>
        <input type="submit" value="Clock In"/>
    </form>

export default ActivityForm