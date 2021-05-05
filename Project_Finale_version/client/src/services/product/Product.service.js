import axios from 'axios';
const api = 'http://localhost:3001/';


class Product {


    getAll = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    findByCountry = (country) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product/findByCountry/`+country)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    findByWebsite = (website) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product/findByWebsite/`+website)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getPagesByWebsite = (website) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product/getPagesByWebsite/`+website)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    create = (product,websiteId) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `product/`+websiteId, product,{ headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    assignToWebsite = (product,websiteId) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `product/assignToWebsite/`+websiteId, product)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    update = (product,productId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `product/`+productId, product)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getOneById = (productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product/`+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    checkExistence = (website,productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product/checkExistence/`+website+'/'+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    productDetails = (productId,websiteId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `product/productDetails/`+websiteId+'/'+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    removeFromWebsite = (productId,websiteId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `product/removeFromWebsite/`+websiteId+'/'+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    delete = (productId) => {
        return new Promise((resolve, reject) => {
            axios.delete(api + `product/`+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };



}

const instance = new Product();

export default instance;
