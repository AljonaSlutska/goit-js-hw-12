import axios from 'axios';

const API_KEY = "52399913-eb814ceb32c08bc3c85c670ba";

export async function getImagesByQuery(query, page, perPage) {
    try {
        const response = await axios.get("https://pixabay.com/api/", {
        params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page:perPage,
        },
    });
    return response.data;
    } catch (error) {
        throw error;
    }
}