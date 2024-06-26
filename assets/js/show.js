import {getAnimals} from './api.js';

// DOM elements
const detailContainer = document.getElementById('detailContainer');

/**
 * Function to fetch and display animal details
 */
async function displayAnimalDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const animalName = urlParams.get('name');
    if (animalName) {
        try {
            const [response] = await getAnimals([animalName]);
            const { data } = response;
            console.log(data);
            if (data.length > 0) {
                const animal = data[0]; // Assuming the first match is the required one
                const characteristics = animal.characteristics;

                let characterHtml = '';
                for (const [key, value] of Object.entries(characteristics)) {
                    if (key !== 'slogan') {
                        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                        characterHtml += `<p class="flex">
                                        <span class="font-semibold">${capitalizedKey.replace(/_/g, ' ')}:&ensp;</span>
                                        <span class="text-red-700">${value}</span>
                                      </p>`;
                    }
                }

                detailContainer.innerHTML = '';
                detailContainer.innerHTML = `
                    <h1 class="text-2xl font-bold font-mono mb-5">${animal.name}</h1>
                    <p class="my-5 italic text-yellow-600">"${characteristics.slogan}"</p>
                    <div class="mx-auto text-left w-1/2">
                        ${characterHtml}
                    </div>
                `;
            } else {
                detailContainer.innerHTML = '<p class="text-xl pl-5 font-mono font-light">No details found for this animal.</p>';
            }
        } catch (error) {
            console.error('Error Fetching data: ', error);
        }
    } else {
        detailContainer.innerHTML = '<p class="text-xl pl-5 font-mono font-light">No animal name provided.</p>';
    }
}

displayAnimalDetails();
