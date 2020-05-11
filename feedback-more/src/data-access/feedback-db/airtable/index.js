let Airtable = require('airtable');
let base = new Airtable({apiKey: 'keyCHKB8fUTL8rwBF'}).base('appEr5cQ2fEVXVwXv');
let serializer = require('./serializer')
let marvel = require('marvel-characters')


let listFeedback = () => {
  return new Promise((resolve, reject) => {
    base('feedback').select({view: 'Grid view'})
    .firstPage(function(err, records) {
      if (err) { reject(err) }
      
      let data = serializer(records)
      resolve(data)
    });
  })
}

let postFeedback = async (feedback) => {
  let {rating, stars, category, comment, contact } = feedback
  
  let response = await fetch('https://extreme-ip-lookup.com/json/')
  let data = await response.json()
  let location = data.city

  return new Promise((resolve, reject) => {
    base('feedback').create([{
        "fields": {
          reference: marvel(),
          rating,
          stars,
          category,
          comment,
          contact,
          location
        }
      }
    ], function (err, records) {
      if (err) {reject(err)}
      
      let data = serializer(records)
      resolve(data)
    });
  })
}


module.exports = {
  listFeedback,
  postFeedback
}