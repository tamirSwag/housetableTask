import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/api";

function NewHouseFormPage() {
    // TODO: Check for react component order conventions

    function handleSubmit(submitEvent) {
        submitEvent.preventDefault(); // Prevent the browser from reloading the page

        const formJson = extrectFormDataAsJson(submitEvent.target);

        fetch(`${API_BASE_URL}/houses`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formJson)
        });
    }

    function extrectFormDataAsJson(form) {
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        return formJson;
    }

    return (
        <>
            <Link to={`/`} className="btn btn-secondary btn-sm">What? I don't want to create a house...</Link>
            <form onSubmit={handleSubmit} className="m-2">
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
        </>
    );

}

export default NewHouseFormPage;
