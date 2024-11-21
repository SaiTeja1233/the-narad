import React, { useState, useEffect } from "react";
import "./Voicestyles.css";

// Map of voice names to image URLs
const voiceImages = {
    "Microsoft David": "/male1.png",
    "Microsoft Mark": "/male2.png",
    "Microsoft Zira": "/femaleimg2.png",
    "Google US English": "/female1.png",
};

// Map of original voice names to custom display names
const voiceDisplayNames = {
    "Microsoft David": "Sitaram",
    "Microsoft Mark": "Arjun",
    "Google US English": "Aadhya",
    "Microsoft Zira": "Suryakantham",
};

const VoiceButtons = ({ onVoiceSelect }) => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isMale, setIsMale] = useState(true);

    // Fetch voices from speech synthesis
    // useEffect(() => {
    //     const loadVoices = () => {
    //         const allVoices = window.speechSynthesis.getVoices();
    //         const filteredVoices = allVoices.filter((voice) =>
    //             isMale
    //                 ? voice.name.startsWith("Microsoft David") ||
    //                   voice.name.startsWith("Microsoft Mark")
    //                 : voice.name.startsWith("Microsoft Zira") ||
    //                   //   voice.name.startsWith("Microsoft Heera") ||
    //                   voice.name.startsWith("Google US English")
    //         );
    //         setVoices(filteredVoices);
    //     };

    //     if (window.speechSynthesis.onvoiceschanged !== undefined) {
    //         window.speechSynthesis.onvoiceschanged = loadVoices;
    //     }

    //     loadVoices(); // Initial load
    // }, [isMale]);

       useEffect(() => {
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            const filteredVoices = allVoices.filter((voice) =>
                isMale
                    ? voice.name.startsWith("Microsoft David") ||
                      voice.name.startsWith("Microsoft Mark")
                    : voice.name.startsWith("Microsoft Zira") ||
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
                Selected Avatar:{" "}
                {selectedVoice
                    ? voiceDisplayNames[selectedVoice.split(" - ")[0]]
                    : "None"}
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
                    const baseVoiceName = voice.name.split(" - ")[0];
                    const imageSrc =
                        voiceImages[baseVoiceName] || "/default-image.png";
                    const displayName =
                        voiceDisplayNames[baseVoiceName] || baseVoiceName;

                    return (
                        <div className="Voice-btn" key={index}>
                            <button
                                className="button4"
                                onClick={() => handleButtonClick(voice)}
                            >
                                <img
                                    src={imageSrc}
                                    alt={displayName}
                                    className="voice-button-image"
                                />
                            </button>
                            <p className="voice-name">{displayName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VoiceButtons;
