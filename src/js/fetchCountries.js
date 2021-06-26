import listTpl from '../templates/list-countries.hbs';

const input = document.querySelector('.input');
const list = document.querySelector('.list');

input.addEventListener('input', onInputInput);

function onInputInput(event) {
  event.preventDefault();
  const searchQuery = input.value;
  console.log(searchQuery);
  fetchCountries(searchQuery)
    .then(renderCountrys)
    .catch(error => console.log(error));
}

function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountrys(countri) {
  const marcup = listTpl(countri);
  console.log(marcup);
  list.innerHTML = marcup;
}

// const searchQuery = onInputInput;

// console.log(searchQuery);

//  listTpl(searchQuery);
//  list.innerHTML;
