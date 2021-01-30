const { users, user_workout } = require('../../models');
const accessKey = process.env.ACCESS_SECRET;
const { verify } = require('jsonwebtoken');
const { Op } = require('sequelize');
const {URL}= require('../../controllers/url');

module.exports = async(req,res) =>{
    
    try{
        const { workoutId } = req.body;

        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = verify(userInfoInToken, accessKey);
    
        const _userId = await users.findOne({ 
            attributes : ['id'],
            where : {email : checkToken.email}
        })
    
        await user_workout.destroy({
            where : {
                [Op.and] : [
                    {userId : _userId.id},
                    {workoutId : workoutId}
                ]
            }
        });
    
        return res.redirect(`${URL}/myroutine/myworkout`);
    }catch(err){
        return res.status(500).send('server error');
    }

}