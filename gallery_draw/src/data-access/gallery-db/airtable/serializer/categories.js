const _serializeSingle = (category) => {
  return {
    'id': category.id,
    'name': category.fields.name
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