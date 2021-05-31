import correctSound from "../../assets/correct.wav";
import incorrectSound from "../../assets/incorrect.wav";
import selectSound from "../../assets/select.wav";

class SoundEffects {
    private correct: HTMLAudioElement;
    private incorrect: HTMLAudioElement;
    private select: HTMLAudioElement;
    private soundMuted: boolean;

    constructor() {
        this.correct = new Audio(correctSound);
        this.incorrect = new Audio(incorrectSound);
        this.select = new Audio(selectSound);
        this.soundMuted = true;
        this.mute();
    }

    playCorrect() {
        this.correct.play();
    }

    playIncorrect() {
        this.incorrect.play();
    }

    playSelect() {
        this.select.play();
    }

    mute() {
        if (this.soundMuted) {
            this.correct.muted = true;
            this.incorrect.muted = true;
            this.select.muted = true;
            this.soundMuted = false;
        } else {
            this.correct.muted = false;
            this.incorrect.muted = false;
            this.select.muted = false;
            this.soundMuted = true;
        }
    }
}

export const sound = new SoundEffects();
