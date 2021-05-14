import React from 'react';
import ImageOne from './../../assets/AdultLeagues.jpg';
import ImageTwo from './../../assets/HighSchoolCollegiates.jpg';
import ImageThree from './../../assets/SportsFitness2.jpg';
import ImageFour from './../../assets/YouthLeagues.jpg';

const LandingCarousel = () => {
    return (
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100 m-auto" src={ImageOne} alt="First slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 m-auto" src={ImageTwo} alt="Second slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 m-auto" src={ImageThree} alt="Third slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 m-auto" src={ImageFour} alt="Fourth slide" />
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    )
}

export default LandingCarousel;