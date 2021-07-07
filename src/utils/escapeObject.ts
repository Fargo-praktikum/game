import serialize from "serialize-javascript";

export const escapeObject = (data: unknown) =>
    serialize(data).replace(/</g, "\\\u003c");
