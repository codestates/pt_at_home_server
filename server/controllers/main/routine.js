const axios = require('axios');
const { URL } = require('../../controllers/url');

module.exports = async (req, res) => {
    try {
        const recommendRoutine = await axios.get(`${URL}/myroutine`, {
            headers: { withCredentials: true }
        })
        res.send({ data: recommendRoutine.data.data, message: 'ok' })
    } catch (err) {
        res.status(500).send({ message: 'server error' })
    }
}