import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";
import FlipPage from "react-flip-page";
import chaptersData from "./chapters.json";
import VoiceButtons from "./Components/Books/VoiceButtons";

const FlipBook = () => {
    const location = useLocation();
    const [chapters, setChapters] = useState(chaptersData);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [videoSrc, setVideoSrc] = useState(""); // State for video source
    const [videoElement, setVideoElement] = useState(null); // State for video element
    const popupRef = useRef(null);
    const utteranceRef = useRef(null);
    const flipPageRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const textToSpeakRef = useRef("");
    const spokenLengthRef = useRef(0);

    const storyName = location.state?.story;

    // Mapping of voice names to video URLs
    const voiceVideos = {
        "Microsoft David": "/malevid1.mp4",
        "Microsoft Mark": "/malevid2.mp4",
        "Microsoft Heera": "/femalevid1.mp4",
        "Microsoft Zira": "/femalevid2.mp4",
    };

    useEffect(() => {
        if (storyName) {
            const chapterIndex = chapters.findIndex(
                (chapter) => chapter.name === storyName
            );
            if (chapterIndex !== -1) {
                setCurrentChapter(chapterIndex);
            }
        }
    }, [storyName, chapters]);

    const handlePlayPause = (htmlContent, pageIndex) => {
        const synth = synthRef.current;

        if (isPlaying) {
            synth.cancel();
            setIsPlaying(false);
            if (videoElement) {
                videoElement.pause(); // Pause video if audio is paused
            }
        } else {
            const textContent = stripHTML(htmlContent);
            const utterance = new SpeechSynthesisUtterance(
                textContent.slice(spokenLengthRef.current)
            );
            utterance.rate = 1;

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.onend = () => {
                setIsPlaying(false);
                spokenLengthRef.current = 0;
                const nextPageIndex = pageIndex + 1;
                if (nextPageIndex < chapters[currentChapter].pages.length) {
                    setCurrentPageIndex(nextPageIndex);
                    flipPageRef.current.gotoNextPage();
                    handlePlayPause(
                        chapters[currentChapter].pages[nextPageIndex],
                        nextPageIndex
                    );
                }
            };

            utterance.onboundary = (event) => {
                spokenLengthRef.current += event.charLength;
            };

            synth.speak(utterance);
            utteranceRef.current = utterance;
            textToSpeakRef.current = textContent;
            setIsPlaying(true);

            // Play video when audio starts
            if (videoElement) {
                videoElement.play();
            }
        }
    };

    const stripHTML = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.innerText || div.textContent || "";
    };

    const handleVoiceSelect = (voice) => {
        setSelectedVoice(voice);
        const baseVoiceName = voice.name.split(" - ")[0]; // Get base voice name
        const videoUrl = voiceVideos[baseVoiceName]; // Get video URL from your mapping
        if (videoUrl) {
            setVideoSrc(videoUrl);
        }
        if (isPlaying) {
            synthRef.current.cancel();
            setIsPlaying(false);
            if (videoElement) {
                videoElement.pause(); // Pause video if switching voice
            }
        }
    };

    const togglePopup = () => {
        if (isPopupVisible) {
            setIsClosing(true);
            setTimeout(() => {
                setIsPopupVisible(false);
                setIsClosing(false);
            }, 500);
        } else {
            setIsPopupVisible(true);
        }
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            togglePopup();
        }
    };

    useEffect(() => {
        if (isPopupVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPopupVisible]);

    return (
        <div className="flip-book-container">
            <div className="flip-book">
                <FlipPage
                    orientation="horizontal"
                    responsive={true}
                    flipOnTouch={true}
                    animationDuration={900}
                    ref={flipPageRef}
                    page={currentPageIndex}
                    onPageChange={(pageIndex) => {
                        setCurrentPageIndex(pageIndex);
                        if (videoElement) {
                            videoElement.play(); // Keep video playing when flipping pages
                        }
                    }}
                >
                    {chapters[currentChapter].pages.map(
                        (content, pageIndex) => (
                            <article key={pageIndex} className="page">
                                <h2>{chapters[currentChapter].name}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                                <div className="page-number">
                                    {pageIndex + 1} of{" "}
                                    {chapters[currentChapter].pages.length}
                                </div>
                            </article>
                        )
                    )}
                </FlipPage>
            </div>
            <button className="audio-control-button" onClick={togglePopup}>
                <div className="button-text">Choose Avatar</div>
            </button>

            {isPopupVisible && (
                <div className="popup-overlay">
                    <div
                        className={`popup-content ${
                            isClosing ? "slide-out" : "slide-in"
                        }`}
                        ref={popupRef}
                    >
                        <button className="close-popup" onClick={togglePopup}>
                            X
                        </button>
                        <VoiceButtons
                            onVoiceSelect={handleVoiceSelect}
                            isPlaying={isPlaying}
                            handlePlayPause={() =>
                                handlePlayPause(
                                    chapters[currentChapter].pages[
                                        currentPageIndex
                                    ],
                                    currentPageIndex
                                )
                            }
                        />
                    </div>
                </div>
            )}
            <div>
                <button
                    className="Audio-play-pause"
                    onClick={() =>
                        handlePlayPause(
                            chapters[currentChapter].pages[currentPageIndex],
                            currentPageIndex
                        )
                    }
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>

            {/* Video Playback Section */}
            {videoSrc && (
                <div className="video-container">
                    <button
                        className="close-video-button"
                        onClick={() => {
                            setVideoSrc(""); // Set videoSrc to empty to close video
                            if (videoElement) {
                                videoElement.pause(); // Pause video when closing
                            }
                        }}
                    >
                        X
                    </button>
                    <video
                        src={videoSrc}
                        ref={setVideoElement} // Set video element reference
                        // controls
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }} // Adjust size as needed
                    />
                </div>
            )}
        </div>
    );
};

export default FlipBook;
