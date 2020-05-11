let FEEDBACK = [
  {
    reference: "john",
    rating: "positive",
    stars: 4,
    category: "other",
    comment: "yeh was amazing loved it",
    location: "sydney",
    createdTime: "2020-05-06T10:11:55.000Z"
  }, 
  {
    reference: "jane",
    rating: "negative",
    stars: 1,
    contact: "email@email.com",
    location: "melbourne",
    createdTime: "2020-05-06T10:11:55.000Z"
  },
  {
    reference: "weishi",
    rating: "neutral",
    stars:31,
    location: "sydney",
    createdTime: "2020-05-06T09:11:55.000Z"
  }
]

let listFeedback = () => {
  return Promise.resolve(FEEDBACK)
}

let postFeedback = (feedback) => {
  let {reference, rating, stars, category, comment, contact, location } = feedback
  let createdTime = new Date().toLocaleDateString()
  let newFeedback = {
    reference: reference || null,
    rating: rating || null,
    stars: stars || null,
    category: category || null,
    comment: comment || null,
    contact: contact || null,
    location: location || null,
    createdTime
  }

  FEEDBACK.push(newFeedback)
  return listFeedback()
}

module.exports = {
  listFeedback,
  postFeedback
}