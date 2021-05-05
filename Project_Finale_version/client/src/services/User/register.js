import axios from 'axios';
const api = 'http://localhost:3001/';

class register {
    register = (e) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `users/register` , e ,{
                headers: {
                    'authorization': 'Bearer '+e.token
                }
            })
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    console.log(error);
                })
        })

    };



}
const instance = new register()

export default instance;
