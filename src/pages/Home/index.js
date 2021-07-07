import React, { useEffect, useState } from 'react';
import LandingCarousel from '../../components/LandingCarousel/LandingCarousel';
import './Home.css';


const Home = () => {
    const [showLoginMsg, setShowLoginMsg] = useState(true);

    useEffect(() => {
        if (document.getElementById("memberspace-login").innerText === 'Join Now / Login') {
            setShowLoginMsg(true);
        } else {
            setShowLoginMsg(false);
        }
    })

    return (
        <div className="home">
            <h1 className="main-header">Welcome to All Abilities Live</h1>
            <LandingCarousel />
            <div className="home-intro mt-5">
                <p>We provide you an opportunity to watch all the live events online.</p>
                {showLoginMsg && <p style={{ color: "red" }}>Please click <a className="btn btn-danger" href="https://members.aaliveevents.com/member/sign_in">Join Now / Login</a> to create an account and purchase a daily pass of $10 to access the Tournaments page.</p>}

                <p>Access our Events and Paramus pages for free via our top navigation. </p>
                <p>Please excuse our new look as our site has entered training camp mode (under construction) and will return soon with new and improved features.</p>
            </div>
        </div>
    )
}

export default Home;