import React from "react";
import "./styles/ActivityForm.css";

type Props = {
    handleSubmit: (event : React.FormEvent<HTMLFormElement>) => void;
    activityFormDescription: string;
    activityFormError: string;
    setActivityFormDescription: (description: string) => void;
}

const ActivityForm = ({ handleSubmit, activityFormError, activityFormDescription, setActivityFormDescription }: Props) =>
    <form onSubmit={handleSubmit} className="activity-form">
        <div className="activity-form-label-container">
            <label htmlFor="activity-description" className="activity-form-header">Description</label>
            <span className="activity-form-error">{ activityFormError ? activityFormError : ""}</span>
        </div>
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