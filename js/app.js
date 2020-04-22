document.addEventListener('DOMContentLoaded', () => {
/* ===================================== 
  VARIABLES
======================================== */
const gridContainer = document.querySelector('.grid-container')
const close = document.querySelector(".close");
const info = document.querySelector('#info');
const cards = document.querySelectorAll('.card'); 

/* ===================================== 
   FUNCTIONS
======================================== */
const show = event => {
  info.style.display = 'block'; 
}

function fetchData(url){
    return fetch(url)
              .then(checkStatus)
              .then(res => res.json() )
              .catch(error => console.log('Looks like there was problme', error) )
  }

function checkStatus(response){
    if(response.ok){
      return Promise.resolve(response);
    }else{
      return Promise.reject(response.statusText)
    }
  } 

/* ===================================== 
   EVENT LISTENERS
======================================== */
cards.forEach(card => card.addEventListener('click', show))

// gridContainer.addEventListener('click', event => {
//   if(event.target.className === 'card'){
//      info.style.display = 'block'
//      }
// });

close.addEventListener('click', () => {
  info.style.display = 'none'; 
}); 

/* ===================================== 
 FETCH
======================================== */


})