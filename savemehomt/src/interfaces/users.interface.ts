import { Request, Response } from 'express';

export type expressTemplate = (req: Request, res: Response) => void;