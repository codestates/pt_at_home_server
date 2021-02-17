import { Request, Response } from 'express';

export interface User {
  userName: string;
  email: string;
  password: string;
  accessToken: Text;
  refreshToken: Text;
}

export interface Routine {
  title: string;
  userId: number;
}

export interface userWorkout {
  userId: number;
  workoutId: number;
}

export interface routineWorkout {
  routineId: number;
  workoutId: number;
  mySetCount: number;
  myCount: number;
  myBreakTime: number;
}

export type expressTemplate = (req: Request, res: Response) => void;