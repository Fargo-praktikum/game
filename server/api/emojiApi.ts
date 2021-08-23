import EmojiService from "../services/emojiService";
import { Request, Response } from "express";
import { handleError } from "./utils/sendError";

const emojiService = new EmojiService();

export default class EmojiApi {

    static request = async (_request: Request, response: Response) => {
        try {
            response.send(await emojiService.request());
        }
        catch (e) {
            handleError(e, "Cannot get emojies", response);
        }
    };

}
