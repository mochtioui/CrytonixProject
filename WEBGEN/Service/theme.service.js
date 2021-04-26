import axios from 'axios';
const api = 'http://localhost:3001/';
const side_id = '5e7ce3309f0d3737e8980743'

class Theme {

    getTheme = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `theme`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    addTheme = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `theme`, data,{ headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    editTheme = (data) => {
        return new Promise((resolve, reject) => {
            axios.patch(api + `theme`, data,{ headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    deleteTheme = (themeId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `theme/` + themeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    checkUsedTheme = (themeId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `theme/check/` + themeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    check

    }

const instance = new Theme()

export default instance;
