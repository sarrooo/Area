import { Request } from "express";

export const getRedirectUri = (req: Request) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  return url.split('&')[0];
}
