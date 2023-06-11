import { Link } from "react-router-dom";

export default function HouseNotFoundPage() {
    return (
        <div>
            <h1>House Not Found!</h1>
            <p>Sorry, but the house you requested does not exist in our database. 
                Maybe it was removed over time, you can create it again <Link to="/new-house">here</Link> :)</p>
        </div>
    );
}