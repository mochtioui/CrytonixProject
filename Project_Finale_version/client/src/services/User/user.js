import axios from 'axios';
const api = 'http://localhost:3001/';
class user{

    getAll = (e) => {
        return new Promise((resolve, reject) => {
            console.log("////////////////////////");
            axios.get(api + `users`,{
                headers: {
                'authorization': 'Bearer '+e
            }
            }
                )
                .then(res => {
                    console.log("////////////////////////");
                    console.log(res.data);
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getOneById = (typeId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `users/`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    update = (type,typeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `users/`+typeId, type)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    changepassword = (type,typeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `users/changepassword/`+typeId, type)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
}

const instance = new user();

export default instance;
