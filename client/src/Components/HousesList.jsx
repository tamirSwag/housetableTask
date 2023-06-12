import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { API_BASE_URL } from "../constants";

function HousesList() {
    const [houses, setHouses] = useState([]);
    useEffect(() => {
        fetchHouses().then(houses => {
            setHouses(houses);
        });
    }, []);
    
    async function fetchHouses() {
        const response = await fetch(`${API_BASE_URL}/houses`);
        const houses = await response.json();
        return houses;
    }

    return (
        <div className="my-3 me-5">
            {houses.map(house => {
                return (
                    <div key={house.id} className="row">
                        <div className="col">Address: {house.address}</div>
                        <div className="col">Current Value: {house.currentValue}</div>
                        <Link to={`/house-details/${house.id}`} className="btn btn-primary btn-sm col">Details</Link>
                    </div>);
            })}
        </div>
    );

}

export default HousesList;