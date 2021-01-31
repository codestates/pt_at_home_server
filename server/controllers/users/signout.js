module.exports = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'accessToken not found' })
    } else {
        try {
            res.status(200)
                .cookie('accessToken', null, { httpOnly: true })
                .send({ message: 'signout success' })
        } catch (err) {
            res.status(500).send({ message: 'server error' })
        }
    }
}