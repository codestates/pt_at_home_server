const { routines, routine_workout } = require('../../models');
const { URL } = require('../../controllers/url');

module.exports = async (req, res) => {
    try {
        const { routineId } = req.body
        await routines.destroy({ where: { id: routineId } });

        await routine_workout.destroy({ where: { routineId: routineId } });

        res.redirect(`${URL}/myroutine`)

    } catch (err) {
        res.status(500).send('server error')
    }
}
