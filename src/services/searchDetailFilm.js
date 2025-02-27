import axios from 'axios';

export default async function searchDetailFilm(ttid) {
    const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?tt=${ttid}`);

    console.log('TT Response :', response)

    return response.data.short;




}
