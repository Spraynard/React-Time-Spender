import { Duration } from "moment";

export interface IActivity {
    id: string; // Arbitrary activity id
    description: string; // Description of our activity
    duration: Duration; // Moment duration object to encapsulate our duration
    startDate: Date; // Time in which we started timing our activity
    endDate: (Date | null); // Time in which we stopped timing our activity
    timerID: (number | null); // The timerID associated with the activity. Not null when timer is on
}

export interface IActivityDictionary {
    [ id : string ] : IActivity
}


export interface IActivitySerialized {
    id: string; // Arbitrary activity id
    description: string; // Description of our activity
    duration: number
    startDate: string
    endDate: (string | null)
    timerID: (number | null); // The timerID associated with the activity. Not null when timer is on
}

export interface IActivityDictionarySerialized {
    [ id : string ] : IActivitySerialized
}