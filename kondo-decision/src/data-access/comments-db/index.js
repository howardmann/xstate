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

let postComment = ({comment, issue_id, author, author_logo}) => {
    let newComment = {
        ["record_id"]: Math.random(),
        ["record_id (from issues)"]: issue_id,
        ["Contact"]: author,
        ["kondo_contact_logo"]: author_logo,
        ["date"]: new Date(),
        ["Comment"]: comment
    }

    COMMENTS.push(newComment)
    return findCommentsByIssueId(issue_id)
}

module.exports = {
    listComments,
    findCommentsByIssueId,
    postComment
}

