const { users, user_workout } = require('../../models');
const refreshKey = process.env.REFRESH_SECRET;
const { verify } = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = async(req,res) =>{
    
    try{
        const { workoutId } = req.body;

        const userInfoInToken = req.headers.authorization.substr(7);
        const checkToken = verify(userInfoInToken, refreshKey);
    
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
    
        return res.redirect('http://localhost:8080/myroutine/myworkout');
    }catch(err){
        return res.status(500).send('server error');
    }

}