import { emailRegexp } from "../../constants";

// eslint-disable-next-line
export const composeValidators = (...validators: Function[]) => (value: string) => {
    return validators.reduce((error, validator) => error || validator(value), undefined);
};

export const required = (value: any): "this field is required" | undefined => (value ? undefined : "this field is required");

export const minLength = (minLengthValue: number) => (value: string): string | undefined => (
    (value && value.length >= minLengthValue) ? undefined : `min length is ${minLengthValue} symbols`
);
export const maxLength = (maxLengthValue: number) => (value: string): string | undefined => (
    (value && value.length <= maxLengthValue) ? undefined : `max length is ${maxLengthValue} symbols`
);

export const validateEmail = (value: string): undefined | "incorrect email" => {
    const regExp = emailRegexp;
    return regExp.test(value) ? undefined : "incorrect email";
};
