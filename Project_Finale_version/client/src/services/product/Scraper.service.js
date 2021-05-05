import axios from 'axios';
const api = 'http://localhost:3001/';
class Scraper {

    scrap = (toScrap) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `scraper/scraper`, toScrap)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    create = (toScrap) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `scraper`, toScrap)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

}

const instance = new Scraper();

export default instance;
