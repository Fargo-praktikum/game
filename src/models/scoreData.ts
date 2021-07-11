export default interface ScoreData {
    rating: number,
    score: number,
    date: number,
    userId: number,
    name: string,
    themes: {[key: string]:
            { score: number }
    },
    avatar?: string | null
}
