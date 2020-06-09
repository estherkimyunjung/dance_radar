function myFetch(urlDanser, options = {}){
  return fetch(urlDanser, options)
  .then(res => res.json())
}

const url = 'http://localhost:3000/dancers'

myFetch(url)
.then(dancers => {
    for(dancer of dancers){
      showDancer(dancer)

      const btnNavRight = document.querySelectorAll('nav button')[1]
      btnNavRight.innerText = dancers[1].name
    
    }
})

const urlDanser = 'http://localhost:3000/dancers/1'


myFetch(urlDanser)
.then(dancer => {
    showDancer(dancer)
})

function showDancer(dancer){

  const btnNavRight = document.querySelectorAll('nav button')[0]
  btnNavRight.innerText = dancer.name

  const h2DancerName = document.querySelector('#dancer-name')
  h2DancerName.innerText = dancer.name

  const imgDancerImage = document.querySelector('#dancer-img') 
  imgDancerImage.src = dancer.image
  
  const pDancerDesc = document.querySelector('#dancer-description') 
  pDancerDesc.innerText = dancer.description
 
  const spanDancerCount = document.querySelector('#like-count') 
  spanDancerCount.innerText = dancer.likes

  const btnDancerUnlike = document.querySelector('#unlike')

  btnDancerUnlike.addEventListener('click',() => {
    if(dancer.likes > 0){
      spanDancerCount.innerText = -- dancer.likes
      patchFetch(urlDanser)
    } else {
      spanDancerCount.innerText = 0
    }
  
  })

  const btnDancerLike = document.querySelector('#like')

  btnDancerLike.addEventListener('click', () => {
    spanDancerCount.innerText = ++ dancer.likes
    patchFetch(urlDanser)
  })
  
  const formFeedback = document.querySelector('form') 
  const inputFeedback = document.querySelector('#new-feedback') 

  formFeedback.addEventListener('submit', (e) => {
    e.preventDefault()

    let inputFeed = inputFeedback.value
    let feedback = dancer.feedback.push(inputFeed)

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        feedback: dancer.feedback
      })
    }

    myFetch(urlDanser, options)
    .then(updateFeed => {
      showDancer(updateFeed)
      formFeedback.reset()
    })

  })

  const ulFeedback = document.querySelector('.feedback ul')
  ulFeedback.innerText = ''

  for(const liFeeds of dancer.feedback){
      const liFeedback = document.createElement('li')
      liFeedback.innerText = liFeeds
      ulFeedback.append(liFeedback)
  }

  function patchFetch(urlDanser){

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: dancer.likes
      })
    }

    myFetch(urlDanser, options)
  }

}
