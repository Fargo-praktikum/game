// see https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// eslint-disable-next-line max-len
export const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneRexep = /^\+?\d{11}$/i;

export const passwordMinLength = 6;

export const appUrl = "http://local.ya-praktikum.tech";
