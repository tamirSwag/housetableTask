import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export async function loader({ params }) {
    const houseId = params.houseId;
    const response = await fetch(`${API_BASE_URL}/houses/${houseId}`);
    const houseDetails = await response.json();
    return houseDetails;
}

function HouseDetailsPage() {
    const houseDetails = useLoaderData();

    return (
        <div className="m-2">
            <h3>House details:</h3>
            <div>Address: {houseDetails.address}</div>
            <div>Current Value: {houseDetails.currentValue}</div>
            <div>Loan Amount: {houseDetails.loanAmount}</div>
        </div>
    );

}

export default HouseDetailsPage;