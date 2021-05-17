// Тестовый тип данных, потом заменить на то, что будет приходить с api

export interface UserScore {
    rating: number,
    name: string,
    date: number,
    score: number
    userId?: number,
    theme?: string,
}
