let COMMENTS = require('../../db/comments.js').default
let serialize = require('./serializer')

let listComments = () => {
    return Promise.resolve(serialize(COMMENTS))
}

let findCommentsByIssueId = (id) => {
    let comments = serialize(COMMENTS)
    let commentsArr = comments.filter(el => el["issue_id"] === id)
    return Promise.resolve(commentsArr)
}

module.exports = {
    listComments,
    findCommentsByIssueId
}