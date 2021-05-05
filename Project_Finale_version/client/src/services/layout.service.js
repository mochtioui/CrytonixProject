import axios from 'axios';
const api = 'http://localhost:3001/';
//const side_id = '5e7ce3309f0d3737e8980743'


let side_id ='';
let datas =sessionStorage.getItem('webselect');
let web = JSON.parse(datas);
if (web!=null){
    side_id = web._id;
}

class Layout {

    getLayout = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `layout/`+ side_id)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }



    }



const instance = new Layout()

export default instance;
