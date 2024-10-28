import React, { useState, useEffect } from "react";
import "./Voicestyles.css";

// Map of voice names to image URLs
const voiceImages = {
    "Microsoft David": "/male1.png",
    "Microsoft Mark": "/male2.png",
    "Microsoft Heera": "/femaleimg2.png",
    "Microsoft Zira": "/female1.png",
};

const VoiceButtons = ({ onVoiceSelect }) => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isMale, setIsMale] = useState(true);

    // Fetch voices from speech synthesis
    useEffect(() => {
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            const filteredVoices = allVoices.filter((voice) =>
                isMale
                    ? voice.name.startsWith("Microsoft David") ||
                      voice.name.startsWith("Microsoft Mark")
                    : voice.name.startsWith("Microsoft Zira") ||
                      voice.name.startsWith("Microsoft Heera")
            );
            setVoices(filteredVoices);
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        loadVoices(); // Initial load
    }, [isMale]);

    const handleButtonClick = (voice) => {
        setSelectedVoice(voice.name);
        onVoiceSelect(voice);
    };

    const toggleVoiceGender = () => {
        setIsMale((prev) => !prev);
        setSelectedVoice(null);
    };

    return (
        <div className="main">
            <div className="text">
                Selected Voice: {selectedVoice ? selectedVoice : "None"}
            </div>
            <div className="toggle-button-cont">
                <button onClick={toggleVoiceGender} className="toggle-button">
                    {isMale
                        ? "Switch to Female Voices"
                        : "Switch to Male Voices"}
                </button>
            </div>
            <div className="buttons">
                {voices.map((voice, index) => {
                    // Use a default image if the voice name doesn't match any keys
                    const imageSrc =
                        voiceImages[voice.name.split(" - ")[0]] ||
                        "/default-image.png"; // Match only the base name
                    console.log(`Voice: ${voice.name}, Image Src: ${imageSrc}`);

                    return (
                        <div className="Voice-btn" key={index}>
                            <button
                                className="button4"
                                onClick={() => handleButtonClick(voice)}
                            >
                                <img
                                    src={imageSrc}
                                    alt={voice.name}
                                    className="voice-button-image"
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VoiceButtons;
