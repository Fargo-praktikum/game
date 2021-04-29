const snakeCaseRegexp = /(_[a-z])/;
const snakeCaseReplaceCallback = (group: string) => `${group.toUpperCase().replace("_", "")}`;

export function fromSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    // eslint-disable-next-line prefer-const
    for (let [snakeKey, value] of Object.entries(obj)) {
        const key = snakeKey.replace(snakeCaseRegexp, snakeCaseReplaceCallback);

        if (Object.prototype.toString.call(value) === "[object Object]") {
            value = fromSnakeCase(value as Record<string, unknown>);
        }

        (result as any)[key] = value;
    }

    return result;
}

export function fromSnakeCaseString(value: string): string {
    return value.replace(snakeCaseRegexp, snakeCaseReplaceCallback);
}
