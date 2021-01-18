const express = require('express');
const router = express.Router();
const {myRoutineController} =require('../controllers');

router.get('/', myRoutineController.myRoutine);
router.get('./myworkout', myRoutineController.myWorkout);
router.post('./saveworkout', myRoutineController.saveWorkout); // 회의 때 상의할 부분
router.post('./removeworkout', myRoutineController.removeWorkout);// 회의 때 상의할 부분
router.post('./createroutine', myRoutineController.createRoutine);// 회의 때 상의할 부분
router.post('./deleteroutine', myRoutineController.deleteRoutine);// 회의 때 상의할 부분


module.exports = router;
