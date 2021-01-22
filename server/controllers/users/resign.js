const { users } = require('../../models');


module.exports = async(req,res) =>{
    const { email } = req.body // userName은 반드시 고유한 값이여야함

    const checkUserName =await users.findOne({where : {email : email}});
    try {
        if(checkUserName){
            await users.destroy({ where : {email : email}});
            res.send({message : 'resign success'});
        }else{
            return res.status(400).send({message : 'cannot verified'});
        }
    }
    catch(err){
        return res.status(500).send({message : 'server error'});
    } 
}