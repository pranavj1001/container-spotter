import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";

const Home = () => {
    return (
        <React.Fragment>
            <div>Home Component</div>
            <div>
                <Link to="/tool">Go To Tool</Link>
            </div>
        </React.Fragment>
    );
};

export default Home;