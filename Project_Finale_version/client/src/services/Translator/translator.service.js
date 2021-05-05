import axios from 'axios';

class Translator {

    translate = (sourceText, sourceLang, targetLang) => {

        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=`
            + sourceLang + `&tl=` + targetLang + `&dt=t&q=` + encodeURI(sourceText);

        return new Promise((resolve, reject) => {
            axios.post(url)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    }

const instance = new Translator()

export default instance;
