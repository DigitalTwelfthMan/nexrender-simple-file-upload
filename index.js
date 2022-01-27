
   
const fs = require('fs')
const {name} = require('./package.json')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data');

module.exports = (job, settings, {input, url}, type) => {
    console.log('hello from my module: ' + name);

    if (type != 'postrender') {
        throw new Error(`Action ${name} can be only run in postrender mode, you provided: ${type}.`)
    }

    input = input || job.output;

    if (!path.isAbsolute(input)) input = path.join(job.workpath, input);

    url = url;
    console.log ('The target url is ' + url)

    console.log ( 'The job.uid is ' + job.uid)
    console.log ( 'The input file is ' + input)

    let data = new FormData;
    data.append('uuid', job.uid);
    data.append('file', fs.createReadStream(input));

    return new Promise(function(resolve, reject){

    axios
        .post(url, data, {
            headers: data.getHeaders(),
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
          } 
        )
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
            resolve()
        })
        .catch(error => {
            console.error(error)
            reject()
        })
    })
}