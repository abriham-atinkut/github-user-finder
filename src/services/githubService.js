import axios from "axios";
const BASE_URL = "https://api.github.com/search/users?q";

const TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;
const fetchUserData = async (searchTerm, location, minRepos) => {
  let query = searchTerm ? `${searchTerm}` : "";
  if (location) query += `location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  try {
    const response = await axios.get(`${BASE_URL}=${query}&per_page=10`, {
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    });
    const userData = response.data.items;
    const detailedUsers = await Promise.all(
      userData.map(async (user) => {
        const res = await axios.get(user.url, {
          headers: {
            Authorization: `token ${TOKEN}`,
          },
        });
        return res.data;
      }),
    );
    return detailedUsers;
  } catch (err) {
    throw err;
  }
};

export default fetchUserData;
