import {isEmpty} from "./myDash/isEmpty";

export const getTimeInfo = (date: string) => {
    if (isEmpty(date)) return;

    const dateNew = new Date(date);
    const hours = dateNew.getHours();
    const minutes = dateNew.getMinutes();
    const minutesText = minutes.toString().padStart(2, '0');

    return `${hours}:${minutesText}`;
};
