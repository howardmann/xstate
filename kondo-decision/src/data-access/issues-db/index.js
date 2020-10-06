let ISSUES = require('../../db/issues.js').default
let serialize = require('./serializer')

let listIssues = () => {
    return Promise.resolve(serialize(ISSUES))
}


module.exports = {
    listIssues
}