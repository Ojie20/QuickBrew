import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingCard = () => {
    return (
        <div className="card text-center mx-auto my-5" >
            <div className="card-body">
                <h1 className="card-title">Welcome to QuickBrew!</h1>
                <p className="card-text">Your ultimate destination for discovering amazing cocktail recipes.</p>
                <p className="card-text">Explore, mix, and enjoy your favorite drinks with ease.</p>
            </div>
        </div>
    );
};

export default LandingCard;