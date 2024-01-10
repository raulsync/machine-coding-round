const textAreaElm = document.querySelector('.textarea')
const charactersElm = document.querySelector('.statnumber_characters')

const tweetElem = document.querySelector('.statnumber_tweet')

const emailElem = document.querySelector('.statnumber_email')

const wordElem = document.querySelector('.statnumber_words')

console.log(textAreaElm)
console.log(charactersElm)

const listenCharacters = () => {
  const totalCharacters = textAreaElm.value.length

  // For char count
  charactersElm.textContent = totalCharacters
  // for tweet count
  const tweetCounts = 20 - totalCharacters
  tweetElem.textContent = tweetCounts
  if (tweetCounts < 0) {
    tweetElem.style.color = 'red'
  } else {
    tweetElem.style.color = 'black'
  }
  //for email counts
  const emailCounts = 20 - totalCharacters
  emailElem.textContent = emailCounts

  if (emailCounts < 0) {
    emailElem.style.color = 'red'
  } else {
    emailElem.style.color = 'black'
  }
  //for words count
  const wordCounts = textAreaElm.value.split(' ').length

  wordElem.textContent = wordCounts
  if (textAreaElm.value.length === 0) {
    wordCounts = 0
  }
}

textAreaElm.addEventListener('input', listenCharacters)
