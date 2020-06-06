const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));

const getFilteredCities = (matchWord, cities) => {

    const filteredCities = cities.filter(place => {
        const regex = new RegExp(matchWord, `ig`);
        return place.city.match(regex) || place.state.match(regex);
    });

    return filteredCities;
};

const searchElem = document.querySelector(`.search-form .search`);
const suggestionsElem = document.querySelector(`.search-form .suggestions`);
let filteredCities = [];

const updateSuggestions = (e) => {

    const keyCode = e.keyCode || e.which;

    switch (keyCode) {

        case 38:
        case 40:
        case null:
        case undefined:
            return;
    }

    const matchWord = e.target.value;
    filteredCities = getFilteredCities(matchWord, cities);

    const liElems = filteredCities.map(place => {

        const regex = new RegExp(`(${matchWord})`, `ig`);
        let city = place.city.replace(regex, `<span class="hl">$1</span>`);
        let state = place.state.replace(regex, `<span class="hl">$1</span>`);
        let population = place.population.replace(/\B(?=(\d{3})+(?!\d))/g, `,`);

        return `
            <li>
                <span class="name">${city}, ${state}</span>            
                <span class="population">${population}</span>   
            </li>
        `;
    }).join(' ');

    suggestionsElem.innerHTML = liElems;
}

let currentSuggestionIndex = -1;

const handleArrowKeysPress = (e) => {

    const keyCode = e.keyCode || e.which;

    switch (keyCode) {

        case 38:
            currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, 0);
            break;

        case 40:
            currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, Math.max(filteredCities.length - 1, 0));
            break;
            
        case 13:
            e.preventDefault();    
        break;

        default: return;
    }

    const suggestionsElems = suggestionsElem.querySelectorAll(`li`);
    const selectedSuggestionElem = suggestionsElems[currentSuggestionIndex];

    if (keyCode === 13 && selectedSuggestionElem) {

        filteredCities = [];
        searchElem.value = selectedSuggestionElem.querySelector(`span.name`).innerText;

        return false;
    }

    suggestionsElems.forEach(elem => elem.classList.remove(`selected`));
    selectedSuggestionElem.classList.add(`selected`);
};

searchElem.addEventListener(`change`, updateSuggestions);
searchElem.addEventListener(`keyup`, updateSuggestions);
document.addEventListener(`keydown`, handleArrowKeysPress)