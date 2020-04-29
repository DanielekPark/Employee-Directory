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
  console.log(employees)
  let employeeHTML = ''; 

  employees.forEach((employee, index) => {
    let name = employee.name; 
    let email = employee.email; 
    let city = employee.location.city;
    let pictures = employee.picture;

    employeeHTML += 
      `<div class="card" data-index="${index}">
          <img class="avatar" src="${pictures.medium}">
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
      <img class="modal-img" src=${picture.medium} alt>
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

/* ===================================== 
   EVENT LISTENERS
======================================== */
                /* ===================================== 
                  SEARCH FUNCTION
                ======================================== */
// const input = document.querySelector('input'); 
// const textContainer = document.querySelectorAll('.text-container'); 

// const search = event => {
//   const searchNames = event.target.value.toLowerCase(); 
  
//   textContainer.forEach(name => {
//     const employeeCard = name.firstElementChild.textContent; 
//     const container = employeeCard.parentElement;

//     if(container.indexOf(searchNames) > -1){
//       container.style.display ='grid';
//     }else{
//       container.style.display ='none'; 
//     }
//   })
// }
// input.addEventListener('keyup', search); 

const search = () => {
  const input = document.querySelector('input'); 
  let filter = input.value.toLowerCase();
  const names = document.querySelectorAll('.name'); 
  
  names.forEach(name => {
    let employeeCard = document.querySelector('.card')[name];
    let inputValue = employeeCard.textContent; 
    if(inputValue.toLowerCase().indexof(filter) > -1){
      employeeCard[name].style.display = 'grid';
    }else{
      employeeCard[name].style.display = 'none';
    }
  })
}

gridContainer.addEventListener('click', () => {
  if(event.target !== gridContainer){
    const card = event.target.closest('.card'); 
    const index = card.getAttribute('data-index');
    displayModal(index)
  }
})

modal.addEventListener('click', event => {
    const close = event.target; 
    if(close.className === 'close'){
      modal.style.display ='none'; 
    }
})


/* ===================================== 
 FETCH REQUESTS
======================================== */
fetchData(urlAPI)
  .then(data => data.results)
  //.then(data => console.log(data))
  .then(data => displayEmployees(data))

 

})