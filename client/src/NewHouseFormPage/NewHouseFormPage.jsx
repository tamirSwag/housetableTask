import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants";

function NewHouseFormPage() {
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
                    <form onSubmit={handleSubmit}>
                        <h3>Enter the details of your house:</h3>
                        <div>
                            <label className="form-label">House full address:
                                <input type="text" name="address" className="form-control" />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">House current value:
                                <input type="number" name="currentValue" className="form-control" />
                            </label>
                        </div>
                        <div>
                            <label className="form-label">House loan amount:
                                <input type="number" name="loanAmount" className="form-control" />
                            </label>
                        </div>
                        <button type='submit' className="btn btn-primary">Create house</button>
                    </form>
                </div>
            }
        </div>
    );

}

export default NewHouseFormPage;
