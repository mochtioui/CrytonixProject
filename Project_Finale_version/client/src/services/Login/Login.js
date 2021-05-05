import axios from 'axios';
const api = 'http://localhost:3001/';

class login {


    log = (e) => {
        return new Promise((resolve, reject) => {
            console.log(e);
            axios.post(api + `users` ,
            {
                email: e.email,
                password: e.password,
            }
            )
                .then(res => {
                    console.log(res);
                    resolve(res);
                })
                .catch(error => {
                    console.log(error);
                })
        })

    };

    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `website`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };




}

const instance = new login()

export default instance;
