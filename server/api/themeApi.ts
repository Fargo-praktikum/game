import ThemeService from "../services/themeService";
import { Request, Response } from "express";
import { handleError } from "./utils/sendError";

const themeService = new ThemeService();

export default class ThemeApi {

    static create = async (request: Request, response: Response) => {
        try {
            response.send(await themeService.create(request.body));
        }
        catch (e) {
            handleError(e, "Cannot create theme", response);
        }
    };

    static update = async (request: Request, response: Response) => {
        try {
            response.send(await themeService.update(request.body));
        }
        catch (e) {
            handleError(e, "Cannot update theme", response);
        }
    };

    static request = async (request: Request, response: Response) => {
        try {
            response.send(await themeService.request(request.query));
        }
        catch (e) {
            handleError(e, "Cannot get theme", response);
        }
    };

}
