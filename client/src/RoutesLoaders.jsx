import { redirect } from "react-router-dom";
import { API_BASE_URL } from "./constants";


export async function HouseDetailsLoader({ params }) {
    const houseId = params.houseId;
    const response = await fetch(`${API_BASE_URL}/houses/${houseId}`);
    if (response.status == 404) return redirect('/house-not-found');
    const houseDetails = await response.json();
    return houseDetails;
}