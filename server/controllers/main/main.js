const { workouts, image, parts } = require('../../models');

module.exports = async (req, res) => {
    try {
        const workoutData = await workouts.findAll({
            attributes: [
                'id', 'title', 'instruction',
                'setCount', 'count', 'breakTime',
                'calrorie', 'category', 'tool'],
        })

        const _url = await image.findAll({
            attributes: ['url', 'workoutId'],
        })

        const _parts = await workouts.findAll({
            attributes: ['id'],
            include: { model: parts },
            // raw: true,
        })


        const result = workoutData.map((data, index) => {
            data.dataValues.image = new Array;
            data.dataValues.parts = new Array;
            _url.forEach(el => {
                if (el.workoutId === index + 1) {
                    data.dataValues.image.push(el.url);
                }
            })
            _parts[index].dataValues.parts.forEach(el => {
                data.dataValues.parts.push(el.part);
            })
            return data.dataValues
        })

        res.send({ data: result, message: 'ok' });
    } catch (err) {
        res.status(500).send({ message: 'server error' })
    }

}