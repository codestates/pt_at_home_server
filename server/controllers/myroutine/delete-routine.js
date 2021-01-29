const { routines, routine_workout } = require('../../models');

module.exports = async (req, res) => {
    try {
        const { routineId } = req.body
        await routines.destroy({ where : {id : routineId}});

        await routine_workout.destroy({ where : {routineId : routineId}});

        res.redirect('http://localhost:8080/myroutine')

    } catch (err) {
        res.status(500).send('server error')
    }
}
