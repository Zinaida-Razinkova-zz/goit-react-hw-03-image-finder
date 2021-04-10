import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "19892329-0452805ee0827a1229c764d7c";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  orientation: "horizontal",
  image_type: "photo",
  per_page: 12,
};
const imagesApi = ({ searchQuery = "", currentPage = 1 }) => {
  return axios
    .get("", { params: { q: searchQuery, page: currentPage } })
    .then((response) => response.data.hits);
};
export { imagesApi };
