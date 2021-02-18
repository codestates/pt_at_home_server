import { Request, Response } from 'express';

export interface userInfoType {
    id : number;
    userName : string;
    email : string;
    iat? : number;
    exp? : number;
}

export interface userType {
    id : number;
    email : string;
    password : string;
    accessToken : string;
    refreshToken : string;
    readonly createdAt : Date;
    readonly updatedAt : Date;
}

export type expressTemplate = (req: Request, res: Response) => void;
