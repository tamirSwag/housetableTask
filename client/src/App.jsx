import { Link } from "react-router-dom";

import './App.css';

function App() {

  return (
    <>
      <h1>Welcome to Tamir's Housetable Task!</h1>
      <Link to={`/new-house`} className="btn btn-primary btn-sm">New House</Link>
    </>
  );

}

export default App;