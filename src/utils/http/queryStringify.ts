import isPlainObject, { PlainObject } from "../isPlainObject";

export default function queryString(data: PlainObject): string {
    if (!isPlainObject(data)) {
        throw new Error("input must be an object");
    }

    return getParams(data).map(arr => arr.join("=")).join("&");
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || Array.isArray(value);
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    for(const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}
