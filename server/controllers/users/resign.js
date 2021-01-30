const { users } = require('../../models');
const accessKey = process.env.ACCESS_SECRET;
const { verify } = require('jsonwebtoken');

module.exports = async(req,res) =>{
    const { email } = req.body 
    const userInfoInToken = req.headers.authorization.substr(7);
    const checkToken = verify(userInfoInToken, accessKey);
    const checkEmail =await users.findOne({where : {email : email}});

    try {
        if(checkEmail.email === checkToken.email){
            await users.destroy({ where : {email : email}});
            res.clearCookie('refreshToken').send({message : 'resign success'});
        }else{
            return res.status(400).send({message : 'cannot verified'});
        }
    }
    catch(err) {
        return res.status(500).send({message: 'server error'})
    }
}