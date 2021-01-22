const { users } = require('../../models'); 
const {sign, verify} = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const accessKey = process.env.ACCESS_SECRET;
const refreshKey = process.env.REFRESH_SECRET;

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
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const result = await users.create(
                {
                    email : email, 
                    password : hashPassword, 
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
        }else{
            return res.status(400).send({message : 'user already exists'});
        }
    }
    catch(err){
        return res.status(500).send({message : 'server error'});
    }
    // const { email , password, userName} = req.body 

    // const test =await bcrypt.hash(password, saltRounds) //hash password 

    // const databaseHash = await users.create({email : email, password : test, userName : userName});

    // const test2 = await bcrypt.compare(password, databaseHash.password);

    // console.log(test2);
}