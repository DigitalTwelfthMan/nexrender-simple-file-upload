
   
const fs = require('fs')
const {name} = require('./package.json')
const path = require('path')
const axios = require('axios')

module.exports = (job, settings, {input, url}, type) => {
    console.log('hello from my module: ' + action.module);

    if (type != 'postrender') {
        throw new Error(`Action ${name} can be only run in postrender mode, you provided: ${type}.`)
    }

    input = input || job.output;

    if (!path.isAbsolute(input)) input = path.join(job.workpath, input);

    axios
        .post(url, {
            uuid: job.uid,
            file : fs.createReadStream(input)
        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
            resolve()
        })
        .catch(error => {
            console.error(error)
            reject()
        })

}