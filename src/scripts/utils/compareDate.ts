export const compareDate = (dateOne: string, dateTwo: string): boolean => {
    return (new Date(dateOne)).getTime() < (new Date(dateTwo)).getTime();
};
