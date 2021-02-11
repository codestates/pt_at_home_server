import { Request, Response } from 'express';

export interface User {
  id: number;
  email: string;
  password: string;
}


export type expressTemplate = (req: Request, res: Response) => void;