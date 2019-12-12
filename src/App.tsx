import React from 'react';
import "./css/normalize.css";
import './css/App.css';

/** Domain */
import { IActivityDictionary, IApplicationStorage } from './domain/interfaces';
import { IActivityFactory } from "./domain/factories";
import { getActivitiesInDisplayOrder } from "./domain/helpers";

import ActivityGrid from "./domain/components/ActivityGrid";
import ActivityForm from './domain/components/ActivityForm';
import ActivityDisplayItem from './domain/components/ActivityDisplayItem';

const App = () => {
	const [ selectedActivity, setSelectedActivity ] = React.useState<string | null>(null);
	const [ activitiesData, setActivitiesData ] = React.useState<IActivityDictionary>({});
	const [ activities, setActivities ] = React.useState<string[]>([]);
	const [ activityFormDescription, setActivityFormDescription ] = React.useState<string>("");

	// Grab any and all data that we can from session storage on initial load.
	React.useEffect(() => {
		if ( ! window.sessionStorage ) { return }

		let storage_object = window.sessionStorage.getItem("time-spender-session-storage");

		if ( ! storage_object ) { return; }

		let { selectedActivity, activitiesData, activities, activityFormDescription }: IApplicationStorage = JSON.parse(storage_object);

		setSelectedActivity(selectedActivity);
		setActivitiesData(activitiesData);
		setActivities(activities);
		setActivityFormDescription(activityFormDescription);

		// We should go through our activities data and reset any timers
	}, [])

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
