import { Link, useLoaderData } from "react-router-dom";

function HouseDetailsPage() {
    const houseDetails = useLoaderData();

    return (
        <div className="m-2">
            <Link to={`/`} className="btn btn-secondary btn-sm">Go to home page</Link>
            <div className="mb-3">
                <h3>House details:</h3>
                <div>Id: {houseDetails.id}</div>
                <div>Address: {houseDetails.address}</div>
                <div>Current Value: {houseDetails.currentValue}</div>
                <div>Loan Amount: {houseDetails.loanAmount}</div>
                <div>Risk: {houseDetails.risk}</div>
            </div>
            <Link to={`/edit-house/${houseDetails.id}`} className="btn btn-primary btn-sm">Edit</Link>
        </div>
    );

}

export default HouseDetailsPage;