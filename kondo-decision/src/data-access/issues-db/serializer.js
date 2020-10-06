const _serializeSingle = (issue) => {
    return {
        'id': issue.id,
        'name': issue.name,
        'status': issue.status,
        'assigned': issue.assigned,
        'priority': issue.priority,
        'description': issue.description,
        'solution': issue.solution,
        'mailto': issue.mailto,
        'companyLogo': issue.companyLogo,
        'attachments': issue.attachments,
        'equipment': issue.equipment,
        'tenants': issue.tenants,
        'benefit': issue.benefit,
        'raised': issue.raised,
        'email': issue.email,
        'site_name': issue.site_name,
        'site_id': issue.site_id,
        'portfolio': issue.portfolio,
        'category': issue.category
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