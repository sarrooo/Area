import { Request } from "express";

export const getRedirectUri = (req: Request) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  if (!url.includes('?platform')) return url.split('&')[0];
  return url.split('?')[0];
}
