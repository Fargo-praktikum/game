export type PlainObject<T = unknown> = {
    [k in string]: T;
};

export default function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === "object"
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === "[object Object]";
}
