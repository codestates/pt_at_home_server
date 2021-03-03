import { Request, Response } from 'express';

export interface listType {
    id : number;
    title : string;
    instruction : string;
    setCount : number;
    count : number;
    calrorie : number;
    category : string;
    tool : string;
    url : Array<string>;
    parts : Array<string>;
    breakTime? : number;
    myCount? : number;
    mySetCount? : number;
    myBreakTime? :number;
}

export interface reqType {
    category : string;
    part : Array<string>
    tool : Array<string>
    path : string;
}

export type expressTemplate = (req: Request, res: Response) => void;

