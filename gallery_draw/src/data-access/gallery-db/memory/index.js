let GALLERIES = require('../../galleryDB')


let listCategories = () => {
  return Promise.resolve(GALLERIES.categories)
}

let listImages = () => {
  return Promise.resolve(GALLERIES.images)
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