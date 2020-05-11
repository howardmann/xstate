const _serializeSingle = (el) => {
  return {
    reference: el.fields.reference,
    rating: el.fields.rating,
    stars: el.fields.stars,
    category: el.fields.category,
    comment: el.fields.comment,
    contact: el.fields.contact,
    location: el.fields.location,
    createdTime: el.createdTime
  };
};

const serializer = (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }
  return _serializeSingle(data)
}

module.exports = serializer



