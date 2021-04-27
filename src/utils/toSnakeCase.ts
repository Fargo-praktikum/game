export default function toSnakeCase<T>(obj: T): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = key.replace(/[A-Z]/, letter => `_${letter.toLowerCase()}`);

        (result as any)[snakeKey] = value;
    }

    return result;
}