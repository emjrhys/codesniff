import { Promise } from 'es6-promise';
import request from 'superagent';


const code = {

    submitCode(code, language) {
    
        return new Promise(function(resolve, reject) {
            request
            .post('http://localhost:8000/app/codes/', {
                content: code,
                language: language
            })
            .end(function (err, res) {
                if (res && res.status === 404) {
                    reject();
                }
                else {
                    //var data = JSON.parse(res.text);
                    console.log(res);
                    resolve();

                }
            });

        });
    
    },

    getCode(id) {
    
        return new Promise(function(resolve, reject) {
        
            request
            .get('http://localhost:8000/app/codes/')
            .end(function(err, res) {
            
                if(res && res.status === '404') {
                    reject();
                }
                else {
                    //var data = JSON.parse(res.body);
                    //resolve(data);
                    console.log(res);
                }

            });
        
        });

    }

}

export default code;
