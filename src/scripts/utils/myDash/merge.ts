type objectType = Record<string, unknown>;

type IsObject<T> = T extends objectType ? T extends any[] ? false : true : false;

function isObject<T>(v: T): IsObject<T> {
    return (typeof v === "object" && !Array.isArray(v)) as IsObject<T>;
}

type Merge<T, U> = IsObject<T> & IsObject<U> extends true ? {
    [K in keyof T]: K extends keyof U ? Merge<T[K], U[K]> : T[K];
} & U : U;


export function merge<T extends objectType, U extends objectType>(lhs: T, rhs: U): Merge<T, U> {
    const res = {} as objectType;
    for (const leftKey of Object.keys(lhs)) {
        const leftValue = lhs[leftKey];
        if (leftKey in rhs) {
            const rightValue = rhs[leftKey];
            if (isObject(leftValue) && isObject(rightValue)) {
                res[leftKey] = merge(leftValue as objectType, rightValue as objectType);
            } else if (!isObject(rightValue)) {
                res[leftKey] = rightValue;
            } else {
                res[leftKey] = rightValue;
                for (const rightKey in rhs) {
                    if (!(rightKey in lhs)) {
                        res[rightKey] = rhs[rightKey];
                    }
                }
            }
        } else {
            if (isObject(leftValue)) {
                res[leftKey] = merge(leftValue as objectType, {} as objectType);
            } else {
                res[leftKey] = leftValue;
                for (const rightKey in rhs) {
                    if (!(rightKey in lhs)) {
                        res[rightKey] = rhs[rightKey];
                    }
                }
            }
        }
    }
    return res as Merge<T, U>;
}

