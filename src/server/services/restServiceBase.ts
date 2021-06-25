export default abstract class RestServiceBase<T> {
    abstract request?: (...args: any[]) => Promise<any>;
    abstract create?: (...args: any[]) => Promise<T>;
    abstract update?: (...args: any[]) => Promise<any>;
    abstract delete?: (...args: any[]) => Promise<any>;
    abstract find?: (...args: any[]) => Promise<T | null>;
}
