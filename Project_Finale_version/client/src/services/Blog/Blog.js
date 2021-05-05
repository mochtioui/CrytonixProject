import axios from 'axios';
const api = 'http://localhost:3001/';

class Blog {

    register = (e) => {
        return new Promise((resolve, reject) => {

            axios.post(api + `Blog/AddBlog` , e , { headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    console.log("1");
                    resolve(res.data);
                })
                .catch(error => {
                    console.log("2");

                    console.log(error);
                })
        })

    };

    Check = (e,language) => {
        return new Promise((resolve, reject) => {

            axios.post( `https://languagetool.org/api/v2/check?text=`+e+'&language='+language+'&enabledOnly=false')
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {

                })
        })

    };
    yourblog = (typeId) => {
        return new Promise((resolve, reject) => {
            console.log(api + `Blog/test`+typeId);
            axios.get(api + `Blog/test`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    blog = () => {
        return new Promise((resolve, reject) => {
            axios.get(api + `Blog`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    }
    blogBywebsite = (typeId) => {
        return new Promise((resolve, reject) => {

            axios.get(api + `Blog/BlogBySite`+typeId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })

    };
    EditBlog = (type,typeId) => {
        return new Promise((resolve, reject) => {
            axios.put(api + `Blog/`+typeId, type )
                .then(res => {
                    console.log("1");

                    resolve(res.data);
                    console.log(res.data);

                })
                .catch(error => {
                    console.log("2");

                    reject(error)
                })
        })

    };

    EditBlogValidation = (type,typeId) => {
        return new Promise((resolve, reject) => {
            console.log(typeId)
            axios.put(api + `Blog/validation/`+typeId, type )
                .then(res => {
                    resolve(res.data);
                    console.log(res.data);

                })
                .catch(error => {
                    console.log("2");

                    reject(error)
                })
        })

    };
    AsseignBlog = (typeId,e) => {
        return new Promise((resolve, reject) => {
            console.log(typeId);
            axios.put(api + `Blog/Asseign/`+typeId, e )
                .then(res => {
                    console.log("1");

                    resolve(res.data);
                    console.log(res.data);

                })
                .catch(error => {
                    console.log("2");

                    reject(error)
                })
        })

    };
    IdBlog = (Idblog) => {

        const b=Idblog.length;
        const c =Idblog.substr(20,b);
        return c;
    };
BlogDetail = (Idblog) => {
    return new Promise((resolve, reject) => {
        axios.get(api + `Blog/BlogById`+Idblog)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error)
            })
    })

}
}
const instance = new Blog();

export default instance;
