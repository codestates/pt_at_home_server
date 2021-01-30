const axios = require('axios');
const {URL}= require('../../controllers/url');
module.exports = async(req,res) =>{

    const { keyword } = req.body;

    const data = await axios.get(`${URL}/main`, 
    {header : {withCredentials : true}});

    const workoutList = data.data.data;
    
    try {
        const filterData = workoutList.filter(workout => {
            if(workout.category === keyword){
                return true;
            }
            if(workout.title === keyword){
                return true
            }
            if(workout.parts.includes(keyword)){
                return true;
            }
            if(workout.tool === keyword){
                return true;
            }
        })
    
        if(filterData.length === 0){
            return res.status(400).send({message : 'not found'});
        }
        return res.send({data : filterData, message : 'ok'})
    } catch(err){
        return res.status(500).send({message : "server error"});
    }

    // part , tool , category , title 검색 가능 

    // 무조건 한단어
}