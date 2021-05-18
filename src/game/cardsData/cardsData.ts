import { english } from "./english";
import { capitals } from "./capitals";
import { chemistry } from "./chemistry";
import { history } from "./history";

interface CardsData {
    [key: string]: {
        themeName: string,
        [key: string]: string | { question: string; answer: string; options: string[]; }[],
    }
}

export const cardsData: CardsData = {
    english: {
        themeName: "Английский язык",
        questions: english
    },
    capitals: {
        themeName: "Столицы",
        questions: capitals
    },
    history: {
        themeName: "История",
        questions: history
    },
    chemistry: {
        themeName: "Химические элементы",
        questions: chemistry
    }
};


