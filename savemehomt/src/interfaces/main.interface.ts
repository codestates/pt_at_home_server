import { Request, Response } from 'express';

export interface workoutStrickMode {
    title : string;
    instruction : string;
    setCount : number;
    count : number;
    breakTime : number;
    calrorie : number;
    category : string;
    tool : string
}

export interface imageStrickMode {
    workoutId : number;
    url : string;
}

export interface workoutPartStrickMode {
    partId : number;
    workoutId : number;
}

export interface partStrickMode {
    part : string;
}



export type expressTemplate = (req: Request, res: Response) => void;

