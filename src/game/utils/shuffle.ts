export function shuffle(array: unknown[]) {
    const shuffleArray = [...array];

    for (let i = shuffleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
    }

    return shuffleArray;
}
