// {
//   id: 1,
//   name: "Carlton",
//   image: "https://i.imgur.com/iM8ybeC.gif",
//   description: "20 years of experience in all forms of dance. Known for shiny outfits.",
//   likes: 23,
//   feedback: [
//     "Nice moves!",
//     "Never stop never stopping"
//   ]
// }

const url = 'http://localhost:3000/dancers/4'

fetch(url)
.then(res => res.json())
.then(dancer => {
    // console.log(dancer)
    showDancer(dancer)
})

const sectionDancer = document.querySelector('.details')

function showDancer(dancer){

  const h2DancerName = document.querySelector('#dancer-name')
  h2DancerName.innerText = dancer.name

  const imgDancerImage = document.querySelector('#dancer-img') 
  imgDancerImage.src = dancer.image
  
  const pDancerDesc = document.querySelector('#dancer-description') 
  pDancerDesc.innerText = dancer.description

  const divDancerLikes = document.querySelector('.likes') 
  
  const spanDancerCount = document.querySelector('#like-count') 
  spanDancerCount.innerText = dancer.likes

  const btnDancerUnlike = document.querySelector('#unlike')
  btnDancerUnlike.addEventListener('click',() => {
    spanDancerCount.innerText = --dancer.likes
    patchFetch(url)
  
  })
  const btnDancerLike = document.querySelector('#like')
  btnDancerLike.addEventListener('click', () => {
    spanDancerCount.innerText = ++dancer.likes
    patchFetch(url)
  })
  
  const sectionFeedback = document.querySelector('.feedback') 
  const formFeedback = document.querySelector('form') 
  const inputFeedback = document.querySelector('#new-feedback') 
  const inputSubmit = document.querySelector('input[type="submit"]')

  formFeedback.addEventListener('submit', (e) => {
    e.preventDefault()

    // console.log(e.target[0].value)
    // let feedback = []
    let inputFeed = e.target[0].value
    let feedback = dancer.feedback.push(inputFeed)

// debugger
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

    fetch(url, options)
    .then(res => res.json())
    .then(updateFeed =>{
      showDancer(updateFeed)
      form.reset()
    })


  })


  
  const ulFeedback = document.querySelectorAll('ul')[1]
  ulFeedback.innerHTML = ''
  for(const liFeeds of dancer.feedback){
      const liFeedback = document.createElement('li')
      console.log(liFeeds)
      liFeedback.innerText = liFeeds
      ulFeedback.append(liFeedback)
  }


  function patchFetch(url){

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

    fetch(url, options)
    .then(res => res.json())
  }

}

