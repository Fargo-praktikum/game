import { Response } from "express";

export const handleError = (e: Error, msg: string, response: Response): void => {
    console.error(e);
    response.status(500).send({ error: msg });
};
