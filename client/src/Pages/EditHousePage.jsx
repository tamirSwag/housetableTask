import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import HouseEditForm from "../Components/HouseEditForm";

function EditHousePage() {
    const houseDetails = useLoaderData();
    const navigate = useNavigate();

    async function handleSubmit(submitEvent) {
        submitEvent.preventDefault(); // Prevent the browser from reloading the page

        const formJson = extrectFormDataAsJson(submitEvent.target);

        const response = await fetch(`${API_BASE_URL}/houses/${houseDetails.id}`, {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formJson)
        });

        if (response.status == 200) navigate(`/house-details/${houseDetails.id}`);
        else throw new Error(JSON.stringify(response));
    }

    function extrectFormDataAsJson(form) {
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        return formJson;
    }

    return (
        <div className="m-2">
            <Link to={`/`} className="btn btn-secondary btn-sm">Go to home page (without saving!)</Link>
            <h3>Change the details of your house:</h3>
            <HouseEditForm handleSubmit={handleSubmit} submitBtnText="Submit edit" initialHouse={houseDetails} />
        </div>
    );

}

export default EditHousePage;
