import axios from "axios";

const API = "http://localhost:8000";

export async function getKnowledgeGraph() {
  const response = await axios.get(
    `${API}/knowledge`
  );

  return response.data;
}