import axios from 'axios';

const getData = async (title) => {

    try {
        const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${title}`);

        if (response.status === 200) {
            console.log(response.data.description)
            return response.data.description;
        } else {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
};

export default getData;
