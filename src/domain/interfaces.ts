export interface IActivity {
    id: string; // Arbitrary activity id
    description: string; // Description of our activity
    duration: number; // Time of task in seconds
    startDate: Date; // Time in which we started timing our activity
    endDate: (Date | null); // Time in which we stopped timing our activity
    timerID: (number | null); // The timerID associated with the activity. Not null when timer is on
}

export interface IActivityDictionary {
    [ id : string ] : IActivity
}

export interface IApplicationStorage {
    selectedActivity : (string | null);
    activitiesData : IActivityDictionary;
    activities : string[];
    activityFormDescription : string;
}