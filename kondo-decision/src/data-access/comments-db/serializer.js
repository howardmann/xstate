const _serializeSingle = (comment) => {
    return {
        'id': comment.record_id,
        'issue_id': comment["record_id (from issues)"],
        'author': comment.Contact,
        'author_logo': comment["kondo_contact_logo"],
        'comment': comment.comment,
        'date': comment.date
    }
}

const serializer = (data) => {    
    if (!data) {
        return null
    }
    if (Array.isArray(data)){
        return data.map(_serializeSingle)
    }
    return _serializeSingle(data)
}

module.exports = serializer