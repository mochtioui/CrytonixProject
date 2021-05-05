import axios from 'axios';
const api = 'http://localhost:3001/';
const websiteId = '5e7ce3309f0d3737e8980743';
const layout='5e7ce3309f0d3737e8980744';
class Ads_banner {


    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `ads_banner`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };


    create = (property) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `ads_banner`, property)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    assignTypeToWebsite = (type) => {
        return new Promise((resolve, reject) => {
            const t ={"page_name":type.name, "type":"category", "productType":type._id, "website":websiteId, "layout":layout};
            axios.post(api + `productProperty/assignTypeToWebsite`, t)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };


    update = (property,propertyId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `ads_banner/`+propertyId, property)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getOneById = (propertyId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `ads_banner/`+propertyId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    delete = (propertyId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `ads_banner/`+propertyId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    getByWebsite = (websiteid) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `productProperty/getByWebsite/`+websiteid)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };


}

const instance = new Ads_banner();

export default instance;
