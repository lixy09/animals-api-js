import {getAnimal} from './api.js';

// dom elements
const form = document.querySelector('form');
const input = document.querySelector('input[name="name"]');
const detailContainer = document.getElementById('detail');
const messageContainer = document.getElementById('message');

/**
 * Function to initialize the application
 */
async function init() {
  // Logic to initialize the application
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        await handleRequest();
    });
}

/**
 * Function to handle the request from the API
 */
async function handleRequest() {
    detailContainer.innerHTML = '';
    messageContainer.innerHTML = '';
    const animalName = input.value.trim();
    if (animalName) {
        try {
            const { data } = await getAnimal(animalName);
            console.log(data);
                if (data.length !== 0) {
                    if (data.length > 1) {
                        messageContainer.innerHTML = '<p class="text-xl pl-5 font-mono font-medium">Which animal are you looking for?</p>';
                    }
                    if (data.length >= 9) {
                        messageContainer.innerHTML = '<p class="text-xl pl-5 font-mono font-light text-red-700">Please try a more specific name.</p>';
                    } else {
                        update(data);
                    }
                } else {
                    detailContainer.innerHTML = '<p class="text-xl pl-5 font-mono font-light text-red-700">Please try a valid name.</p>';
                }
        } catch (error) {
            console.error('Error Fetching data: ', error);
        }
    }
}

/**
 * Function to update the DOM
 */
function update(results) {
    results.forEach((result) => {
        const animalLink = document.createElement('a');
        animalLink.href = `show.html?name=${encodeURIComponent(result.name)}`;
        animalLink.textContent = result.name;
        animalLink.className = 'text-xl font-light font-mono mb-5 hover:text-lime-700';

        const animalContainer = document.createElement('section');
        animalContainer.className = 'text-center';
        animalContainer.appendChild(animalLink);

        detailContainer.appendChild(animalContainer);
    });
}

init();
