export default interface ScoreData {
    id: number,
    score: number,
    date: number,
    userID: number,
    name: string,
    themes: {[key: string]: string},
}
