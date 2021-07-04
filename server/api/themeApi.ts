import ThemeService from "../services/themeService";
import { Request, Response } from "express";

const themeService = new ThemeService();

export default class ThemeApi {

    static create = async (request: Request, response: Response) => {
        try {
            response.send(await themeService.create(request.body));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot create theme" });
        }
    };

    static update = async (request: Request, response: Response) => {
        try {
            response.send(await themeService.update(request.body));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot update theme" });
        }
    };

    static request = async (request: Request, response: Response) => {
        try {
            response.send(await themeService.request(request.query));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot get theme" });
        }
    };

}
