import React from 'react';
import logo from './logo.svg';
import "./css/normalize.css";
import './css/App.css';
import ActivityDisplay from "./ActivityDisplay";
import ActivityGrid from "./ActivityGrid";
import { IActivity, IActivityDictionary } from './interfaces';
import ActivityForm from './ActivityForm';
import ActivityDisplayItem from './ActivityDisplayItem';
import { IActivityFactory } from "./factories";
import { getActivitiesInDisplayOrder } from "./helpers";

const App: React.FC = () => {
	const [ selectedActivity, setSelectedActivity ] = React.useState<string | null>(null);
	const [ activitiesData, setActivitiesData ] = React.useState<IActivityDictionary>({});
	const [ activities, setActivities ] = React.useState<string[]>([]);
	const [ timers, setTimers ] = React.useState<object>({})
	const [ activityFormDescription, setActivityFormDescription ] = React.useState<string>("");

	const handleActivityFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let new_activity = IActivityFactory(activityFormDescription);

		setSelectedActivity(new_activity.id);
		setActivities([ ...activities, new_activity.id ])
		setActivitiesData({ ...activitiesData, [ new_activity.id ] : new_activity })

		setActivityFormDescription("")
	}

	return (
		<div className="app">
			<main className="app-flex-container">
				<div className="activity-display app-container-item">
					<ActivityForm handleSubmit={handleActivityFormSubmit} activityFormDescription={activityFormDescription} setActivityFormDescription={setActivityFormDescription}/>
					<ActivityDisplayItem selectedActivity={(selectedActivity) ?  activitiesData[selectedActivity] : null}/>
				</div>
				<ActivityGrid displayActivities={getActivitiesInDisplayOrder(activities, activitiesData)} setSelectedActivity={setSelectedActivity} headers={["Start Time", "End Time", "Duration", "Description"]}/>
			</main>
		</div>
	);
}

export default App;
