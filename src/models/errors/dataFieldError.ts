export default class DataFieldError extends Error {
    constructor(message: string, dataFieldName: string) {
        super(message);
        this.dataFieldName = dataFieldName;
    }

    dataFieldName: string;
}
