const { users } = require('../../models'); 
const {sign, verify} = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const accessKey = process.env.ACCESS_KEY;
const refreshKey = process.env.REFRESH_KEY;

module.exports = async(req,res) =>{
    const { email , password, userName} = req.body 

    const userCheck = await users.findOne({where :{email : email}})

    try{
        if(!userCheck){
            const userInfo  = {email : email, userName : userName}
    
            const accessToken = sign(userInfo, accessKey, 
            {
                expiresIn : '15s'
            })
            
            const refreshToken = sign(userInfo, refreshKey,
            {
                expiresIn : '7d'
            })
            bcrypt.genSalt(saltRounds, (err,salt)=>{
                bcrypt.hash(password, salt, async(err,hash)=>{
                    const result = await users.create(
                        {
                            email : email, 
                            password : hash, 
                            userName : userName, 
                            accessToken : accessToken,
                            refreshToken : refreshToken
                        }
                    );
                    return res.cookie('refreshToken', refreshToken, 
                        {
                            httpOnly : true,
                        }
                    ).send({data : result , message : 'signup success'})
                })
            })
        }else{
            return res.status(400).send({message : 'user already exists'});
        }
    }
    catch(err){
        return res.status(500).send({message : 'server error'});
    }
}