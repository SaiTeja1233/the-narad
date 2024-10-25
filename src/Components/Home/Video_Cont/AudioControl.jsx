// AudioControl.js
import React, { useRef, useState, useEffect } from "react";
import "./AudioControl.css"; // Create a separate CSS file for styles

const AudioControl = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false); // Start with audio paused
    const maxVolume = 1; // Maximum volume
    const minVolume = 0; // Minimum volume

    // Effect to handle scroll and adjust volume
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY; // Get the current scroll position
            const windowHeight = window.innerHeight; // Height of the viewport
            const documentHeight = document.documentElement.scrollHeight; // Total height of the document

            // Calculate the scroll percentage (0 to 1)
            const scrollPercent = Math.min(
                scrollY / (documentHeight - windowHeight),
                1
            );

            // Calculate new volume based on scroll percentage
            const newVolume =
                maxVolume - scrollPercent * (maxVolume - minVolume);

            // Set the new volume
            if (audioRef.current) {
                audioRef.current.volume = newVolume;
            }
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array to run only on mount and unmount

    // Effect to play audio by default
    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play(); // Attempt to play audio
                    setIsPlaying(true); // Update state to reflect audio is playing
                } catch (error) {
                    console.error("Audio autoplay failed:", error);
                }
            }
        };

        playAudio(); // Call the function to play audio
    }, []); // Run once when the component mounts

    // Function to toggle play/pause
    const togglePlayPause = async () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            try {
                await audioRef.current.play(); // Attempt to play audio 
            } catch (error) {
                console.error("Audio playback failed:", error);
            }
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="audio-control">
            <input
                id="checkboxInput"
                type="checkbox"
                checked={isPlaying} // Sync checkbox state with isPlaying
                onChange={togglePlayPause}
            />
            <label className="toggleSwitch" htmlFor="checkboxInput">
                <div className="speaker">
                    <svg
                        viewBox="0 0 75 75"
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            style={{
                                stroke: "#fff",
                                strokeWidth: 5,
                                strokeLinejoin: "round",
                                fill: "#fff",
                            }}
                            d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                        />
                        <path
                            style={{
                                fill: "none",
                                stroke: "#fff",
                                strokeWidth: 5,
                                strokeLinecap: "round",
                            }}
                            d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                        />
                    </svg>
                </div>
                <div className="mute-speaker">
                    <svg
                        strokeWidth="5"
                        stroke="#fff"
                        viewBox="0 0 75 75"
                        version="1.0"
                    >
                        <path
                            strokeLinejoin="round"
                            fill="#fff"
                            d="m39,14-17,15H6V48H22l17,15z"
                        />
                        <path
                            strokeLinecap="round"
                            fill="#fff"
                            d="m49,26 20,24m0-24-20,24"
                        />
                    </svg>
                </div>
            </label>
            <audio ref={audioRef} loop>
                <source src="homeaudio.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioControl;
