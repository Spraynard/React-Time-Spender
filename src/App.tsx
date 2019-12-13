import React from 'react';
import "./css/normalize.css";
import './css/App.css';

import { Duration } from 'moment';
/** Domain */
import { IActivityDictionary, IActivity } from './domain/interfaces';
import { IActivityFactory } from "./domain/factories";
import { getActivitiesInDisplayOrder, startActivityTimer, setActivitiesDataValue, stopActivityTimer } from "./domain/helpers";
import { useStateFromSessionStorage } from "./domain/hooks";
import { serializeActivityData, serializeActivities, serializeString } from "./domain/serializers";
import { unserializeActivityData, unserializeActivities, unserializeString} from "./domain/unserializers";
import ActivityGrid from "./domain/components/ActivityGrid";
import ActivityForm from './domain/components/ActivityForm';
import ActivityDisplay from './domain/components/ActivityDisplay';

const App = () => {
	const [ selectedActivity, setSelectedActivity ] = useStateFromSessionStorage(null, 'selected-activity', unserializeString, serializeString);
	const [ activitiesData, setActivitiesData ] = useStateFromSessionStorage({}, 'activities-data', unserializeActivityData, serializeActivityData);
	const [ activities, setActivities ] = useStateFromSessionStorage([], 'activities', unserializeActivities, serializeActivities);
	const [ activityFormDescription, setActivityFormDescription ] = useStateFromSessionStorage("", 'activity-form-description', unserializeString, serializeString);
	const [ activityFormError , setActivityFormError ] = React.useState("");
	const activitiesDataRef = React.useRef(activitiesData);

	// So we have access to activitiesData in our setInterval closures
	activitiesDataRef.current = activitiesData;

	const handleActivityFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if ( ! activityFormDescription )
		{
			setActivityFormError("You must supply a description with each activity");
			return
		}

		let newActivity: IActivity = IActivityFactory(activityFormDescription);
		let newActivitiesData: IActivityDictionary = Object.keys(activitiesData).reduce(
			(prev, current) => ({
				...prev,
				[current] : {
					...activitiesData[current],
					endDate : (!activitiesData[current].endDate) ? new Date() : activitiesData[current].endDate,
					timerID: (activitiesData[current].timerID) ? stopActivityTimer(activitiesData[current].timerID) : null
				}
			}),{});

		setSelectedActivity(newActivity.id);
		setActivities([ ...activities, newActivity.id ])
		setActivitiesData({ ...newActivitiesData, [ newActivity.id ] : newActivity })

		setActivityFormDescription("")
		setActivityFormError("");
	}

	/**
	 * Updates the activity's duration
	 * @param id ActivityID
	 */
	const handleTick = ( id: string ) => {
		let newDuration: Duration = activitiesDataRef.current[id].duration.clone();
		newDuration.add(1, 's');
		setActivitiesData(
			setActivitiesDataValue(id, 'duration', newDuration, activitiesDataRef.current )
		);
	}

	const timerStartHandler = ( id : string ) => setActivitiesData({
		...activitiesData,
		[ id ] : {
			...activitiesData[id],
			timerID : startActivityTimer(id, handleTick),
			endDate : null
		}
	})

	/**
	 * Create a new copy of the currently selected time and run a timer instance on it.
	 * @param id ID of activity we want to resume
	 */
	const timerResumeHandler = ( id : string ): void => {
		let new_activity = IActivityFactory(activitiesData[id].description);

		setSelectedActivity(new_activity.id);
		setActivities([...activities, new_activity.id])
		setActivitiesData({ ...activitiesData, [new_activity.id]: new_activity })
	}

	const timerStopHandler = ( id : string ): void => {
		return setActivitiesData({
		...activitiesData,
		[ id ] : {
			...activitiesData[id],
			timerID : stopActivityTimer(activitiesData[id].timerID),
			endDate : new Date()
		}
	});
}

	const handleRemoveActivity = ( id : string ): void => {
		const { [ id ] : deleted, ...other } = activitiesData;

		setActivities(activities.filter( ( activityID : string ) => activityID !== id ));
		stopActivityTimer(activitiesData[id].timerID)
		setSelectedActivity(null)
		setActivitiesData(other);
	}

	return (
		<div className="app">
			<main className="app-flex-container">
				<div className="activity-display app-container-item">
					<ActivityForm
						handleSubmit={handleActivityFormSubmit}
						activityFormDescription={activityFormDescription}
						setActivityFormDescription={setActivityFormDescription}
						activityFormError={activityFormError}
					/>
					<ActivityDisplay
						selectedActivity={(selectedActivity) ?  activitiesData[selectedActivity] : null}
						timerStopHandler={timerStopHandler}
						timerResumeHandler={timerResumeHandler}
						activityRemoveHandler={handleRemoveActivity}
					/>
				</div>
				<ActivityGrid
					displayActivities={getActivitiesInDisplayOrder(activities, activitiesData)}
					setSelectedActivity={setSelectedActivity}
					selectedActivity={selectedActivity}
					timerStartHandler={timerStartHandler}
					headers={["Start Time", "End Time", "Duration", "Description"]}
				/>
			</main>
		</div>
	);
}

export default App;
