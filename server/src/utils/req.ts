import { Request } from "express";

export const getUrl = (req: Request) => {
  return `${req.protocol}://${req.get('host')}/${req.originalUrl}`;
}
