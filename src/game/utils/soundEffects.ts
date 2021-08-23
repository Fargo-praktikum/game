import correctSound from "../../assets/correct.wav";
import incorrectSound from "../../assets/incorrect.wav";
import selectSound from "../../assets/select.wav";
import isServer from "../../utils/isServer";

interface SoundEffects {
    playCorrect(): void;
    playIncorrect(): void;
    playSelect(): void;
    mute(isMuted?: boolean): boolean | void;
}

class SoundEffectsClient implements SoundEffects {
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

// TODO пока это быстрая залепа, чтобы смерджить, как-то завести и не задерживать процесс
class SoundEffectsServer implements SoundEffects {

    // eslint-disable-next-line
    mute(_isMuted?: boolean | undefined): boolean | void {};

    // eslint-disable-next-line
    playCorrect() {}

    // eslint-disable-next-line
    playIncorrect() {}

    // eslint-disable-next-line
    playSelect() {}
}

export const sound = isServer ? new SoundEffectsServer() : new SoundEffectsClient();
