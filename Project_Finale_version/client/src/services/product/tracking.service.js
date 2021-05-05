import axios from 'axios';
const api = 'http://localhost:3001/';
class Tracking {
    create = (link) => {
        return new Promise((resolve, reject) => {
            axios.post(api + `tracker`, link)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    getAll = (websiteId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/findAll/`+websiteId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    findById = (trackId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/findById/`+trackId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    uniqueClicks = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/uniqueClicks/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    clicksByReferrer = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/clicksByReferrer/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    clicksByReferrerProduct = (productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/clicksByReferrerProduct/`+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    clicksByProduct = (productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/clicksByProduct/`+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

    TopReferrer = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/TopReferrer/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    topProductReferrer = (productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/topProductReferrer/`+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    clicksByCountry = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/clicksByCountry/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    TopCountry = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/TopCountry/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    clicksByWebsite = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/clicksByWebsite/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    TopWebsite = (trackedId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/TopWebsite/`+trackedId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    addBankClick = (websiteId,productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/addBankClick/`+websiteId+'/'+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    productClick = (websiteId,productId) => {
        return new Promise((resolve, reject) => {
            axios.get(api + `tracker/productClick/`+websiteId+'/'+productId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };

}

const instance = new Tracking();

export default instance;
