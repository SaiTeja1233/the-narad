import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Swiperstyle.css";

const Swiper = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleNext = () => {
        const nextIndex = (index + 1) % 4;
        setIndex(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (index - 1 + 4) % 4;
        setIndex(prevIndex);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [index]);

    return (
        <div className="imageslider">
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                className="custom-carousel"
                controls={false} // Disable default controls
            >
                <CarouselItem>
                    <img
                        className="home-img1 d-block w-100"
                        src="home-img1.png"
                        alt="slide 1"
                    />
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="home-img2 d-block w-100"
                        src="home-img2.png"
                        alt="slide 2"
                    />
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="home-img3 d-block w-100"
                        src="home-img3.png"
                        alt="slide 3"
                    />
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="home-img4 d-block w-100"
                        src="home-img4.png"
                        alt="slide 4"
                    />
                </CarouselItem>
            </Carousel>

            <div className="controls">
                <i className="bi bi-arrow-left" onClick={handlePrev}></i>
                <i className="bi bi-arrow-right" onClick={handleNext}></i>
            </div>
        </div>
    );
};

export default Swiper;
