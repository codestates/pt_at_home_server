const axios = require('axios');

module.exports = async(req,res) =>{
    const recommendRoutine = await axios.get('http://localhost:8080/myroutine',{
        headers : {withCredentials : true}
    })
    res.send({data : recommendRoutine.data.data, message : 'ok'})
}