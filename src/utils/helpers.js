export const capitalizedWords = (words) => {
  // Capitalize the first letter of each word and Join the words back into a single string
  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
