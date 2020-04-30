let axios = require('axios')
let imageSerializer = require('./serializer/images')
let categorySerializer = require('./serializer/categories')

const IMAGES_URL = 'https://api.airtable.com/v0/app2fZ2DwnHlkk5z7/images?maxRecords=100&view=Grid%20view'
const CATEGORIES_URL = 'https://api.airtable.com/v0/app2fZ2DwnHlkk5z7/categories?maxRecords=10&view=Grid%20view'
const HEADERS = {
  headers: {'Authorization': 'Bearer keyCHKB8fUTL8rwBF'}
}

let listCategories = () => {
  return axios.get(CATEGORIES_URL, HEADERS)
    .then(resp => resp.data)
    .then(resp => categorySerializer(resp.records))
}

let listImages = () => {
  return axios.get(IMAGES_URL, HEADERS)
    .then(resp => resp.data)
    .then(resp => imageSerializer(resp.records))
}

let findImageByCategoryId = async (id) => {
  let images = await listImages()
  return images.filter(el => el.categoryId === id)[0]
}

module.exports = {
  listCategories,
  listImages,
  findImageByCategoryId
}
