import React from 'react';
import './Loader.css';
import Loader from "react-loader-spinner";

const LoaderUI = () => {
    return (
        <div className="fallback">
            <Loader
                type="Puff"
                color="#101522"
                height={50}
                width={50}
            />
        </div>

    );
}


export default LoaderUI;