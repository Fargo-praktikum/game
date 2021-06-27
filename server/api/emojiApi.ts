import EmojiService from "../services/emojiService";
import { Request, Response } from "express";

const emojiService = new EmojiService();

export default class EmojiApi {

    static request = async (_request: Request, response: Response) => {
        try {
            response.send(await emojiService.request());
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot get emojies" });
        }
    };

}
