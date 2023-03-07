import { Request, Response } from "express";

export const getFile = async (_: Request, res: Response) => {
    const file = '/tmp/build/client.apk';
    res.download(file);
};