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

export type subReqType = {
    id : number;
    mySetCount : number;
    myCount : number;
    myBreakTime : number
}

export interface reqType {
    title : string;
    workouts : Array<subReqType>
}

export interface userInfoType {
    id : number;
}

export interface routineType {
    id : number;
    userId : number;
    title : string;
    readonly updatedAt : Date;
    readonly createdAt : Date;
}


export type expressTemplate = (req: Request, res: Response) => void;
