import axios from "axios";
const API_URL = "http://localhost:5000";

export const validateToken = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/api/admin/validateToken`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(async (response) => resolve(response))
      .catch(async (err) => {
        reject(err);
      });
  });
};
