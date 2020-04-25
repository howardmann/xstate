const validateInput = ({name, age}) => {
  let error ={}

  if (!name) {
    error.nameError = "Name cannot be blank"
  }
  
  if (name && name.length < 5) {
    error.nameError = "Name insufficient length"
  }
  if (!age) {
    error.ageError = "Cannot be blank"
  }
      
  if (age && +age < 21) {
    error.ageError = "Underage"
  }

  if (Object.keys(error).length > 0) {
    return {error}
  }
  return true
}

export {validateInput}