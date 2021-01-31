const axios = require('axios');
const { compareSync } = require('bcrypt');
const { URL } = require('../../controllers/url');

module.exports = async (req, res) => {

    const { category, part, tool, path } = req.body

    function getfilterData(data, list) {
        const filtering = list.filter(workout => {
            let filter = 1;

            if (part) {
                for (let i = 0; i < part.length; i++) {
                    if (!workout.parts.includes(part[i])) {
                        filter = 0
                        break;
                    }
                }
            }
            if (!filter) {
                return false;
            }
            if (workout.category === data) {
                return true
            } else {
                return false
            }
        })
        if (filtering.length === 0) {
            return res.status(300).send({ data: [], message: 'not found' })
        }
        return res.send({ data: filtering, message: 'ok' })
    }

    function filter(list) {
        if (category) {
            if (category === '맨몸') {
                getfilterData('맨몸', list);
            } else if (category === '기구') {
                getfilterData('기구', list);
            } else {
                const filtering = list.filter(workout => {
                    return workout.category === '스트레칭'
                })
                res.send({ data: filtering, message: 'ok' });
            }
        } else {
            const filtering = list.filter(workout => {
                let filter = 1;

                if (part) {
                    for (let i = 0; i < part.length; i++) {
                        if (!workout.parts.includes(part[i])) {
                            filter = 0
                            break;
                        }
                    }
                }
                if (!filter) {
                    return false;
                }
                if (tool) {
                    if (workout.tool === tool[0]) {
                        return true;
                    } else {
                        return false
                    }
                }
                return true;
            })
            if (filtering.length === 0) {
                return res.send({ data: list, message: 'ok' })
            }
            return res.send({ data: filtering, message: 'ok' })
        }
    }

    if (path === 'createroutine') {
        try {
            const dashboard = await axios.get(`${URL}/main`,
                { header: { withCredentials: true } });

            const workoutList = dashboard.data.data;
            filter(workoutList);
        } catch (err) {
            return res.status(500).send({ message: 'server error' })
        }
    } else if (path === 'routine') {
        try {
            const accessToken = req.headers.authorization
            const myWorkouts = await axios.get(`${URL}/myroutine/myworkout`,
                {
                    headers: {
                        withCredentials: true,
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    }
                });

            const workoutList = myWorkouts.data.data;
            filter(workoutList);
        } catch (err) {
            return res.status(500).send({ message: 'server error' })
        }
    }
    // 카테고리가 있으면 무조건 카테고리를 기준으로 분류 

    // 맨손 운동 전체이면서 도구 운동을 선택할 수 없다.

    // 모든 도구 운동이면서 맨손운동을 선택할 수 없다.
}