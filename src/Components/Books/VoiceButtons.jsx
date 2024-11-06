import React, { useState, useEffect } from "react";
import "./Voicestyles.css";

// Map of voice names to image URLs
const voiceImages = {
    "Microsoft David": "/male1.png",
    "Microsoft Mark": "/male2.png",
    "Microsoft Heera": "/femaleimg2.png",
    "Microsoft Zira": "/female1.png",
    "Google US English": "femaleimg2.png",
    "Google UK English Male": "/male2.png",
    "Google UK English Female": "/google-uk-female.png",
    // Add more mappings for additional voices here
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
                      voice.name.startsWith("Microsoft Mark") ||
                      voice.name.startsWith("Google UK English Male")
                    : voice.name.startsWith("Microsoft Zira") ||
                      voice.name.startsWith("Microsoft Heera") ||
                      voice.name.startsWith("Google US English")
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
        onVoiceSelect(voice); // Trigger the selection handler
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
                        ? "Switch to Female Avatars"
                        : "Switch to Male Avatars"}
                </button>
            </div>
            <div className="buttons">
                {voices.map((voice, index) => {
                    const imageSrc =
                        voiceImages[voice.name.split(" - ")[0]] ||
                        "/default-image.png"; // Match only the base name

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
