// Тестовый тип данных, потом заменить на то, что будет приходить с api

export interface UserScore {
    id: number,
    name: string,
    date: number,
    score: number
    userID?: number,
    theme?: string,
}
