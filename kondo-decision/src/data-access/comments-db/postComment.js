import{default as COMMENTS} from '../../db/comments.js'
import findCommentsByIssueId from './findCommentsByIssueId'

let postComment = ({comment, issue_id, author, author_logo}) => {
    let newComment = {
        ["record_id"]: Math.random().toString(),
        ["record_id (from issues)"]: issue_id,
        ["Contact"]: author,
        ["kondo_contact_logo"]: author_logo,
        ["date"]: new Date(),
        ["Comment"]: comment
    }

    COMMENTS.push(newComment)
    return findCommentsByIssueId(issue_id)
}

export default postComment

