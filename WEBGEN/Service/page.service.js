import axios from 'axios';
const api = 'http://localhost:3001/';
//const side_id = '5e7ce3309f0d3737e8980743'

let side_id ='';
let datas =sessionStorage.getItem('webselect');
let web = JSON.parse(datas);
if (web!=null){
    side_id = web._id;
}


class Page {

    getPage = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `page/`+ side_id)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    addPage = (formData) => {

        formData.append('website', side_id)

        return new Promise((resolve, reject) => {
            axios.post(api + `page`, formData)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    editPage = (formData) => {

        return new Promise((resolve, reject) => {
            axios.patch(api + `page`, formData)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    deletePage = (pageId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `page/` + pageId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    getPagesBySubTypes = (subTypePageId) => {
        console.log(subTypePageId)
        return new Promise((resolve, reject) => {
            axios.get(api + `page/subtypePage/` + subTypePageId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    updatePosPage = (_id,pos) => {

        return new Promise((resolve, reject) => {
            axios.patch(api + `page/updatePosPage/` + _id + `/` + pos)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    }



const instance = new Page()

export default instance;
