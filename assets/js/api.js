// api root
const apiRoot = 'https://api.api-ninjas.com/v1/animals';

/**
 * Async function to fetch data from an external API
 * @param url - The URL to fetch data from
 * @returns Promise | error
 */
const fetchData = async (url) => {
    try {
        const headers = {
            'X-Api-Key': 'PyYlVWKeS0Tbxlo8DcsVDA==6JM6GnZAfcWnVWYq',
            'Content-Type': 'application/json'
        };
        const response = await fetch(url, { headers });

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error(`Unfortunately this ${error} occured`);
    }
};

/**
   * Fetches a single item from the API
   * @param name - The ID of the item
   * @returns Promise| Error
   */
const getAnimal = async (name) => {
    const url = `${apiRoot}?name=${encodeURIComponent(name)}`;
    return await fetchData(url);
};

export { getAnimal };
