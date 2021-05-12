type Indexed<T = unknown> = {
    [key in string]: T;
};
export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const res: Indexed = {};
    for (const leftKey in lhs) {
        const leftValue = lhs[leftKey];
        if (leftKey in rhs) {
            const rightValue = rhs[leftKey];
            if (isObject(leftValue) && isObject(rightValue)) {
                res[leftKey] = merge(leftValue , rightValue );
            }
            else if (!isObject(rightValue)) {
                res[leftKey] = rightValue;
            }
            else {
                res[leftKey] = rightValue;
                for (const rightKey in rhs) {
                    if (!(rightKey in lhs)) {
                        res[rightKey] = rhs[rightKey];
                    }
                }
            }
        }
        else {
            res[leftKey] = leftValue;
            for (const rightKey in rhs) {
                if (!(rightKey in lhs)) {
                    res[rightKey] = rhs[rightKey];
                }
            }
        }
    }
    return res;
}
function isObject (variable: unknown): variable is any {
    return Object.prototype.toString.call(variable) === "[object Object]";
}
