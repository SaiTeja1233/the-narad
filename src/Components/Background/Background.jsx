import React from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./Background.css";
import Loginpage from "../LoginPage/Loginpage";

function Background() {
    // const particlesLoaded = useCallback(async (container) => {
    //     await console.log(container);
    // }, []);
    // const particlesInit = useCallback(async (engine) => {
    //     await loadFull(engine);
    // }, []);
    return (
        <div className="Background">
            {/* <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fullScreen: false,
                    background: {
                        image: " linear-gradient(19deg, #21212100 0%,#21212100 100%)",
                    },
                    particles: {
                        number: {
                            value: 10,
                            density: { enable: true, value_area: 100 },
                        },
                        color: { value: "#ffffff" },
                        shape: {
                            type: "square",
                            stroke: { width: 0, color: "#ffffff" },
                            polygon: { nb_sides: 5 },
                        },
                        opacity: {
                            value: 0.25,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false,
                            },
                        },
                        size: {
                            value: 29,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 2,
                                size_min: 0.1,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: false,
                            distance: 300,
                            color: "#ffffff",
                            opacity: 0,
                            width: 0,
                        },
                        move: {
                            enable: true,
                            speed: 0.8,
                            direction: "top",
                            straight: true,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: false, mode: "repulse" },
                            onclick: { enable: false, mode: "push" },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 800,
                                line_linked: { opacity: 1 },
                            },
                            bubble: {
                                distance: 790,
                                size: 79,
                                duration: 2,
                                opacity: 0.8,
                                speed: 3,
                            },
                            repulse: { distance: 400, duration: 0.4 },
                            push: { particles_nb: 4 },
                            remove: { particles_nb: 2 },
                        },
                    },
                    retina_detect: true,
                }}
            /> */}
            <div className="log">
                <Loginpage />
            </div>
        </div>
    );
}

export default Background;
