import users, {associate as associateUsers} from './users.model';
import routines, {associate as associateRoutines} from './routines.model';
import parts, {associate as associateParts} from './parts.model';
import user_workouts, {associate as associateUserWorkouts} from './user_workouts.model';
import routine_workouts, {associate as associateRoutine_workouts} from './routine_workouts.model';
import workouts, {associate as associateWorkouts} from './workouts.model';
import workout_parts, {associate as associateWorkoutParts} from './workout_parts.model';
import images, {associate as associateImages} from './image.model';

const db = {
  users,
  routines,
  parts,
  user_workouts,
  routine_workouts,
  workouts,
  workout_parts,
  images
}

export {
    users, 
    routines, 
    parts, 
    user_workouts, 
    routine_workouts, 
    workouts, 
    workout_parts, 
    images
};

export type dbType = typeof db;

associateUsers(db);
associateRoutines(db);
associateParts(db);
associateUserWorkouts(db);
associateRoutine_workouts(db);
associateWorkouts(db);
associateWorkoutParts(db);
associateImages(db);