import { Request, Response } from 'express';

export interface userType {
    email : string;
    password : string;
    userName : string;
}


export type expressTemplate = (req: Request, res: Response) => void;