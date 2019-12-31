import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
        <div>Home Component</div>
        <div>
            <Link to="/tool">Go To Tool</Link>
        </div>
        </div>
    );
};

export default Home;