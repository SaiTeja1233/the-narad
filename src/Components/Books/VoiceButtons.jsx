import React, { useState, useEffect } from "react";
import "./Voicestyles.css";

// Map of voice names to image URLs
const voiceImages = {
    "Microsoft David": "path/to/microsoft_david_image.png", // Replace with actual image URLs
    "Microsoft Ravi": "path/to/microsoft_ravi_image.png",
    "Microsoft Mark": "path/to/microsoft_mark_image.png",
    "Google UK English Male": "path/to/google_uk_english_male_image.png",
    "Microsoft Heera": "path/to/microsoft_heera_image.png",
    "Google हिन्दी": "path/to/google_hindi_image.png",
    "Microsoft Zira": "path/to/microsoft_zira_image.png",
    "Google UK English Female": "path/to/google_uk_english_female_image.png",
};

const VoiceButtons = ({ onVoiceSelect }) => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isMale, setIsMale] = useState(true); // State to track male/female toggle

    // Fetch voices from speech synthesis
    useEffect(() => {
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            const filteredVoices = allVoices.filter((voice) =>
                isMale
                    ? voice.name.toLowerCase().includes("microsoft david") ||
                      voice.name.toLowerCase().includes("microsoft ravi") ||
                      voice.name.toLowerCase().includes("microsoft mark") ||
                      voice.name
                          .toLowerCase()
                          .includes("google uk english male")
                    : voice.name.toLowerCase().includes("microsoft heera") ||
                      voice.name.toLowerCase().includes("google हिन्दी") ||
                      voice.name.toLowerCase().includes("microsoft zira") ||
                      voice.name
                          .toLowerCase()
                          .includes("google uk english female")
            );
            setVoices(filteredVoices);
        };

        // Some browsers (e.g., Chrome) may load voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        loadVoices(); // Initial load
    }, [isMale]); // Dependency on isMale

    const handleButtonClick = (voice) => {
        setSelectedVoice(voice.name);
        onVoiceSelect(voice); // Pass the selected voice to the parent component
    };

    const toggleVoiceGender = () => {
        setIsMale((prev) => !prev); // Toggle between male and female
        setSelectedVoice(null); // Reset selected voice
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
                {voices.map((voice, index) => (
                    <div className="Voice-btn" key={index}>
                        <button
                            className="button4"
                            onClick={() => handleButtonClick(voice)}
                        >
                            <img
                                src={
                                    voiceImages[voice.name] ||
                                    "path/to/default_image.png"
                                } // Replace with a default image if necessary
                                alt={voice.name}
                                className="voice-button-image" // Add a class for styling
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoiceButtons;
