import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1 className="main-header">Welcome to All Abilities Live</h1>
            <div className="intro">
                <p>We provide you an opportunity to watch all the live events online.</p>
                <p style={{ color: "red" }}>Please click Join Now / Login button to create an account to purchase a daily pass of $10 to access the Sports page.</p>
                <p>Access our wedding page for free via our top navigation. </p>
                <p>Please excuse our new look as our site has entered training camp mode (under construction) and will return soon with new and improved features.</p>
            </div>
        </div>
    )
}

export default Home;