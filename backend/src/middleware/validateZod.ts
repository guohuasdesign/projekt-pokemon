import type { Request, Response, NextFunction } from 'express';

type Location = 'body' | 'params' | 'query';

export function validateZod(_schema: unknown, _location: Location) {
  return function (_req: Request, _res: Response, next: NextFunction) {
    next();
  };
}

