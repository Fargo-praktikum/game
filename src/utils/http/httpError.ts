export default class HttpError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(statusText: string, code: number, response: any) {
        super(statusText);

        this.code = code;
        this.response = response;
    }

    code: number;
    response: any;
}
