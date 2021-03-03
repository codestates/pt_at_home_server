import { Request, Response } from 'express';

export interface userType {
    email : string;
    password : string;
    userName : string;
}


export type auth = {
    token : string;
    expDate : Date;
}

export interface signType {
    id : number;
    email : string;
    password : string;
    userName : string;
    accessToken? : string;
    refreshToken? : string;
    readonly updatedAt? : Date;
    readonly createdAt? : Date;
    auth? : auth;
}


export type expressTemplate = (req: Request, res: Response) => void;