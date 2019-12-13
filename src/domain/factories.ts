import { IActivity } from "./interfaces";
import { v4 } from "uuid";
import moment from "moment";

export const IActivityFactory = ( description: string ): IActivity => ({
    id: v4(),
    description : description,
    startDate : new Date(),
    endDate : null,
    duration : moment.duration(),
    timerID : null
});
