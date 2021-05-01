// eslint-disable-next-line @typescript-eslint/ban-types
export const composeValidators = (...validators: Function[]) => (value: string) => {
    return validators.reduce((error, validator) => error || validator(value), undefined);
};

export const required = (value: any) => (value ? undefined : "this field is required");

export const minLength = (minLengthValue: number) => (value: string) => (
    (value && value.length >= minLengthValue) ? undefined : `min length is ${minLengthValue} symbols`
);
export const maxLength = (maxLengthValue: number) => (value: string) => (
    (value && value.length <= maxLengthValue) ? undefined : `max length is ${maxLengthValue} symbols`
);

export const validateEmail = (value: string) => {
    const regExp = /^[^-.](([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return regExp.test(value) ? undefined : "incorrect email";
};
