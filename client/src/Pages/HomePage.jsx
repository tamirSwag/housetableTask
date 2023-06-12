import { Link } from "react-router-dom";
import HousesList from "../Components/HousesList";

function HomePage() {
  return (
    <>
      <div className="cover-image"></div>
      <h1>Welcome to Tamir's Housetable Task!</h1>
      <HousesList />
      <Link to={`/new-house`} className="btn btn-primary btn-sm">New House</Link>
    </>
  );

}

export default HomePage;