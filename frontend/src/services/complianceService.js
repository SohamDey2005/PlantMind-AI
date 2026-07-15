import axios from "axios";

const API = "http://localhost:8000";

export async function getCompliance(id){

    const response=await axios.get(

        `${API}/compliance/${id}`

    );

    return response.data;

}