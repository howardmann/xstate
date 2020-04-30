const _serializeSingle = (image) => {
  return {
    'id': image.id,
    'meta': image.fields.meta,
    'imageURL': image.fields.imageURL[0].url,
    'categoryId': image.fields.categoryId[0]
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