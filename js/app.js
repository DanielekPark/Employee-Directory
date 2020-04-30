document.addEventListener('DOMContentLoaded', () => {
/* ===================================== 
  VARIABLES
======================================== */
let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name,%20picture,%20email,%20location,%20phone,%20dob%20&noinfo%20&nat=US'
const gridContainer = document.querySelector('.grid-container');
const info = document.querySelector('#info');
const modal = document.querySelector('.modal'); //overlay
const modalContent = document.querySelector('.modal-content');
const input = document.querySelector('input');
let employeeIndex = 0;  

/* ===================================== 
   FUNCTIONS
======================================== */
function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response)
  }else{
    return Promise.reject(new Error (response.statusText) )
  }
}

function fetchData(url){
  return fetch(url)
         .then(checkStatus)
         .then(response => response.json() )
         .catch(error => console.log('Looks like there was a problem', error) ); 
}

function displayEmployees(employeeData){
  employees = employeeData 

  let employeeHTML = ''; 

  employees.forEach((employee, index) => {
    let name = employee.name; 
    let email = employee.email; 
    let city = employee.location.city;
    let pictures = employee.picture;

    employeeHTML += 
      `<div class="card" data-index="${index}">
          <img class="avatar" src="${pictures.large}">
          <div class="text-container">
            <p class="name">${name.first} ${name.last}</p>
            <p class="email">${email}</p>
            <p class="city">${city}</p>
          </div>
      </div>` 
    
  })

  gridContainer.innerHTML = employeeHTML;
  
}

function displayModal(index){
  let {
    name,
    dob,
    phone,
    email, 
    location: { city, street, state, postcode},
    picture
  } = employees[index]

  let date = new Date(dob.date); 
  const modalHTML = `
    <div class="close">&times;</div> 
    <div>
      <img class="modal-img" src=${picture.large} alt>
      <span class="arrow">&larr;</span>
      <span class="arrow">&rarr;</span>
      <ul>
        <li><h3 class="name">${name.first} ${name.last}</h3></li>
        <li>${email}</li>
        <li>${phone}</li>
        <li>${city} ${street.name} ${state} ${postcode}</p>
        <li>${date}</li>
      </ul>
    </div>
  `
  info.style.display = 'block';
  modalContent.innerHTML = modalHTML; 
}

const search = () => {
  let filter = input.value.toLowerCase(); 
  const names = document.querySelectorAll('.name');  
  console.log()
  names.forEach(name => {
    let searchNames = name.textContent.toLowerCase(); 
    let container = name.parentNode.parentNode;

    if(searchNames.indexOf(filter) > -1){
      container.style.display ='flex';
    }else{
      container.style.display ='none'; 
    }
  })
}
/* ===================================== 
   EVENT LISTENERS
======================================== */
input.addEventListener('keyup', search); 

gridContainer.addEventListener('click', () => {
  if(event.target !== gridContainer){
    const card = event.target.closest('.card'); 
    const index = card.getAttribute('data-index');
    displayModal(index)
  }
})

//CLOSES MODAL WINDOW
modal.addEventListener('click', event => {
    const close = event.target; 
    if(close.className === 'close'){
      modal.style.display ='none'; 
    }
})

//SWITCHING MODAL WINDOW ARROWS FUNCTION
// const slide = event => {
//   const arrow = event.target;
//   let indices = card.getAttribute('data-index');
//   indices.forEach(index => {
//     if(arrow.textContent === '&larr;'){
//         index++
//     }else if(arrow.textContent === '&rarr;'){
//         index--
//     }
//   })
// }
// spans.forEach(span => span.addEventListener('click', slide))
modal.addEventListener('click', event => {
const arrow = event.target; 

if(arrow.textContent === '&larr;'){

}else if(arrow.textContent === '&rarr;'){

}

}); 

/* ===================================== 
 FETCH REQUESTS
======================================== */
fetchData(urlAPI)
  .then(data => data.results)
  //.then(data => console.log(data))
  .then(data => displayEmployees(data))


 
})