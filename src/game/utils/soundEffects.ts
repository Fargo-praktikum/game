import correctSound from "../../assets/correct.wav";
import incorrectSound from "../../assets/incorrect.wav";
import selectSound from "../../assets/select.wav";

class SoundEffects {
    private _correct: HTMLAudioElement;
    private _incorrect: HTMLAudioElement;
    private _select: HTMLAudioElement;
    private _soundMuted: boolean;

    constructor() {
        this._correct = new Audio(correctSound);
        this._incorrect = new Audio(incorrectSound);
        this._select = new Audio(selectSound);
        this._soundMuted = true;
        this.mute(true);
    }

    playCorrect() {
        this._correct.play();
    }

    playIncorrect() {
        this._incorrect.play();
    }

    playSelect() {
        this._select.play();
    }

    mute(isMuted?: boolean): boolean | void {
        if (typeof isMuted === "undefined") {
            return  this._soundMuted;
        } else {
            if (this._soundMuted) {
                this._correct.muted = true;
                this._incorrect.muted = true;
                this._select.muted = true;
            } else {
                this._correct.muted = false;
                this._incorrect.muted = false;
                this._select.muted = false;
            }
            this._soundMuted = !this._soundMuted;
        }
    }
}

export const sound = new SoundEffects();
