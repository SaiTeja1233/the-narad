import React from "react";
import "./About-style.css";
import Aboutanim3 from "./topAboutanim/Aboutanm3";
import Aboutanim1 from "./topAboutanim/Aboutanim1";
import Aboutanim2 from "./topAboutanim/Aboutanim2";
import BottomSection from "../BottomSection/BottomSection";
import BackToTopButton from "../BackToTop/BackToTop";

function About() {
    return (
        <div className="about">
            <div className="backTotopButton">
                <BackToTopButton />
            </div>
            <div className="about-main-top">
                <div className="about-top-headline">
                    <h1>ABOUT US</h1>
                </div>
            </div>
            <div className="about-top-text">
                <p>
                    Welcome to Narad, where every story comes to life with a
                    personal touch. At Narad, we are pioneering the future of
                    storytelling by integrating cutting-edge artificial
                    intelligence with user-centric customization options. Our
                    platform offers unparalleled storytelling experiences
                    through tailored voices and avatars, crafting a unique
                    narrative journey for every user.
                </p>
            </div>
            <div className="about-mid">
                <div className="about-mid-text1">
                    <div>
                        <Aboutanim2 />
                    </div>
                    <div className="text1">
                        <h1>Our Mission</h1>

                        <p>
                            We are driven by the belief that stories are not
                            just meant to be told—they're meant to be
                            experienced. Our mission is to transform the
                            landscape of storytelling by offering an interactive
                            platform where users can engage with content on a
                            deeply personal level. Through our AI-powered
                            customization, we build a bridge of connectivity
                            between the narrative and the listener, turning
                            passive engagement into an interactive adventure.
                        </p>
                    </div>
                </div>
                <div className="about-mid-text2">
                    <div className="text2">
                        <h1>Our Vision</h1>

                        <p>
                            At Narad, we envision a world where technology
                            brings stories to the forefront of digital
                            engagement, fostering a new era of creativity and
                            personal expression. We aim to create a space where
                            every voice is heard and every character is as vivid
                            as our users' imaginations. By continually advancing
                            our AI, we're dedicated to evolving with our users,
                            ensuring that each story is as unique as the
                            individual who creates it.
                        </p>
                    </div>
                    <div>
                        <Aboutanim1 />
                    </div>
                </div>
                <div className="about-mid-text3">
                    <div>
                        <Aboutanim3 />
                    </div>
                    <div className="text3">
                        <h1>Our Platform</h1>
                        <p>
                            With Narad, users have the tools to craft their own
                            avatars and choose from a suite of custom voices,
                            making each story distinctly their own. Our
                            state-of-the-art AI ensures that each avatar
                            connects on a human level, offering expressions and
                            interactions that resonate. Whether it’s for
                            education, entertainment, or personal reflection,
                            our platform offers a new way to experience and
                            create stories.
                        </p>
                    </div>
                </div>
                <div className="">
                    <BottomSection />
                </div>
            </div>
        </div>
    );
}

export default About;
