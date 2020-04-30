let {
  listCategories,
  listImages,
  findImageByCategoryId
} = require('./airtable/index')
// require('./memory/index')

let galleryDb = {
  listCategories,
  listImages,
  findImageByCategoryId
}

module.exports = galleryDb

// listCategories().then(console.log)
// listImages().then(console.log)
// findImageByCategoryId(1).then(console.log)