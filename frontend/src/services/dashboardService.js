import axios from "axios";

const API = "http://localhost:8000";

export async function getDashboardStats() {
  const response = await axios.get(
    `${API}/dashboard/stats`
  );

  return response.data;
}

export async function getRecentDocuments() {
  const response = await axios.get(
    `${API}/documents`
  );

  return response.data;
}