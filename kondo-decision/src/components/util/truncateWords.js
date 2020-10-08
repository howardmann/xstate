const truncateWords = (str, num) => {
    if (str.split(" ").length <= num) {
        return str
      }
      return str.split(" ").splice(0, num).join(" ") + '...'
}


module.exports = truncateWords