const url = '/api/flashcards';
const cards = document.querySelector('#cards');
const back = document.querySelector('#back-btn');
const forward = document.querySelector('#forward');
const shuffle = document.querySelector('#shuffle');
const answer = document.querySelector('#answer');
const card = document.querySelector('#card');
const addCard = document.querySelector('#add-card');
const addCardForm = document.querySelector('#add-card-form');
let showingForm = false; 
let showingAnswer = false; 
let leng; 
let i = 0;
let allcards = {}

document.addEventListener("DOMContentLoaded", function() {
	axios.get(url)
  .then(addCards)
  .catch(function(err){
    console.log(err); 
  })
});

back.addEventListener('click', function(){
  if(i > 0){
    addRemoveEffects('slideInLeft');
    reset();
    if(i > 0){
      i -= 1;
    }
    resetFront(i)
  }
});

forward.addEventListener('click', function(){
  if(i != leng - 1){
    addRemoveEffects('slideInRight');
    reset();
    if(i <= leng - 2){
      i += 1;
    }
    resetFront(i);
  }
})


shuffle.addEventListener('click', function(){
  reset();
  let rand = Math.floor(Math.random() * leng)
  cards.innerText = allcards[rand].front;
  i = rand;
  addRemoveEffects('tada');
})

card.addEventListener('click', function(){
  addRemoveEffects('flipped');
  if(!showingAnswer){
    if(allcards[i].back.length > 20){
      card.style.fontSize = '8px';
    }
    setTimeout(() => {
      card.style.backgroundColor = 'white';
      card.style.backgroundImage = 'none'; 
      cards.innerText = allcards[i].back;
    }, 300)
    showingAnswer = true;
  }else if (showingAnswer){ 
    reset();
    card.classList.remove('flip');
    resetFront(i);
    // cards.innerText = allcards[i].front;
  }
})

addCard.addEventListener('click', function(){
  if(showingForm){
    showingForm = false;
    addCardForm.classList.add('hidden');
  }else if(!showingForm){
    showingForm = true
    addCardForm.classList.remove('hidden');
  }
})


function reset(){
  setTimeout(() => {
    card.style.fontSize = '20px';
    card.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/2/2e/Notecard.jpg")';
  }, 300)
  showingAnswer = false;
}

function addCards(flashcards){
  flashcards.data.forEach(function(card){
    allcards[i] = {...card}; 
    i++; 
  })
  leng = i; 
  i = 0;
  cards.innerText = allcards[i].front;
}

function addRemoveEffects(val){
  cards.style.opacity = 0;
  card.classList.add(val);
  setTimeout(() => {
    cards.style.opacity = 1;
    card.classList.remove(val);
  }, 300);
}
function resetFront(i){
  cards.style.opacity = 0;
  setTimeout(() => {
    card.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/2/2e/Notecard.jpg")';
    cards.innerText = allcards[i].front;
    cards.style.opacity = 1;
  }, 300)
}