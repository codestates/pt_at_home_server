const { users,routines,user_workouts,routine_workouts } = require('../../models');
const accessKey = process.env.ACCESS_SECRET;
const { verify } = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { email } = req.body
    const userInfoInToken = req.headers.authorization.substr(7);
    const checkToken = verify(userInfoInToken, accessKey);
    const checkUser = await users.findOne({ where: { email: email } });

    try {
        if (checkUser.email === checkToken.email) {
            const routineId = await routines.findAll({where : {userId : checkUser.id}});
            routineId.map(async(routine)=>{
                await routine_workouts.destroy({where : { routineId : routine.id }})
            })
            await routines.destroy({where : {userId : checkUser.id}})
            await user_workouts.destroy({where : {userId : checkUser.id}})
            await users.destroy({ where: { email: email } });
            res.clearCookie('refreshToken').send({ message: 'resign success' });
        } else {
            return res.status(400).send({ message: 'cannot verified' });
        }
    }
    catch (err) {
        return res.status(500).send({ message: 'server error' })
    }
}