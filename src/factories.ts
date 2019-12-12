import { IActivity } from "./interfaces";
import { v4 } from "uuid";

export const IActivityFactory = ( description: string ): IActivity => ({
    id: v4(),
    description : description,
    startDate : new Date(),
    endDate : null,
    duration : 0,
    timerID : null
});
