import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import HouseEditForm from "../Components/HouseEditForm";

function NewHousePage() {
    const [newHouseId, setNewHouseId] = useState();
    // TODO: Check for react component order conventions

    async function handleSubmit(submitEvent) {
        submitEvent.preventDefault(); // Prevent the browser from reloading the page

        const formJson = extrectFormDataAsJson(submitEvent.target);

        const response = await fetch(`${API_BASE_URL}/houses`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formJson)
        });
        
        // TODO: add error handling

        const jsonData = await response.json();
        setNewHouseId(jsonData.newHouseId);
    }

    function extrectFormDataAsJson(form) {
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        return formJson;
    }

    return (
        <div className="m-2">
            {newHouseId ?
                <div>
                    <h3>Thank's!</h3>
                    <p>House was created successfully with the id <Link to={`/house-details/${newHouseId}`} className="badge bg-info">{newHouseId}</Link> - click it for the house page :)</p>
                    Or, <Link to={`/`} className="btn btn-secondary btn-sm">go back to home page</Link>
                </div> :
                <div>
                    <Link to={`/`} className="btn btn-secondary btn-sm">What? I don't want to create a house...</Link>
                    <h3>Enter the details of your house:</h3>
                    <HouseEditForm handleSubmit={handleSubmit} submitBtnText="Create house" />
                </div>
            }
        </div>
    );

}

export default NewHousePage;
