import axios from 'axios';

const API_KEY = '56332254-8c399c713ebd1cc160f0b6b1c';

export async function getImages(query, page = 1) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    },
  });

  return response.data;
}
