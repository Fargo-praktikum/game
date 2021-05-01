export const compareDate = (dateOne: string, dateTwo: string) => {
    return (new Date(dateOne)).getTime() < (new Date(dateTwo)).getTime();
};
