const axios = require('axios');

module.exports = async(req,res) =>{

    const { category , part, tool} = req.body
    
    const data = await axios.get('http://localhost:8080/main', 
    {header : {withCredentials : true}});

    // console.log(data.data.data[0].parts); // 해당 운동부위 출력

    // console.log(data.data.data); //여기서 모든 리스트 출력 가능

    const workoutList = data.data.data;

    function getfilterData(data){
        const filtering = workoutList.filter(workout=>{
            let filter = 1;

            if(part){
                for(let i=0;i<part.length;i++){
                    if(!workout.parts.includes(part[i])){
                        filter = 0
                        break;
                    }
                }
            }
            if(!filter){
                return false;
            }
            if(workout.category === data){
                return true
            }else{
                return false
            }
        })
        if(filtering.length === 0){
            return res.send({message : '일치하는 검색 결과가 없습니다.'})
        }
        return res.send({data : filtering, message : 'ok'})
    }

    try{
        if(category){
            if(category === '맨몸'){
                getfilterData('맨몸');
            }else if(category === '기구'){
                getfilterData('기구');
            }else{
                const filtering = workoutList.filter(workout => {
                    return workout.category === '스트레칭'
                })
                res.send({data : filtering, message : 'ok'});
            }
        }else{
            const filtering = workoutList.filter(workout => {
                let filter = 1;
    
                if(part){
                    for(let i=0;i<part.length;i++){
                        if(!workout.parts.includes(part[i])){
                            filter = 0
                            break;
                        }
                    }
                }
                if(!filter){
                    return false;
                }
                if(tool){
                    if(workout.tool === tool[0]){
                        return true;
                    }else{
                        return false
                    }
                }
                return true;
            })
            if(filtering.length === 0){
                return res.send({message : '일치하는 검색 결과가 없습니다.'})
            }
            return res.send({data : filtering, message : 'ok'})
        }
    } catch(err){
        return res.status(500).send({message : 'server error'})
    }

    // 카테고리가 있으면 무조건 카테고리를 기준으로 분류 

    // 맨손 운동 전체이면서 도구 운동을 선택할 수 없다.
    
    // 모든 도구 운동이면서 맨손운동을 선택할 수 없다.
}