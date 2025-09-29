import axios from 'axios';

const API_KEY = "52399913-eb814ceb32c08bc3c85c670ba";
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
    try {
        const { data } = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: PER_PAGE,
            },
        });
        return data;
    } catch (error) {
        throw error; 
    }
}