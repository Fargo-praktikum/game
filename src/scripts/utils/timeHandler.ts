import { isEmpty } from "./myDash/isEmpty";

export const getTimeInfo = (date: string | undefined): string | undefined => {
    if (isEmpty(date)) return;

    const dateNew = new Date(date as string);
    const hours = dateNew.getHours();
    const minutes = dateNew.getMinutes();
    const minutesText = minutes.toString().padStart(2, "0");

    return `${hours}:${minutesText}`;
};
