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
    const [videoSrc, setVideoSrc] = useState("");
    const [videoElement, setVideoElement] = useState(null);
    const [isVideoMaximized, setIsVideoMaximized] = useState(false);
    const popupRef = useRef(null);
    const utteranceRef = useRef(null);
    const flipPageRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const textToSpeakRef = useRef("");
    const spokenLengthRef = useRef(0);

    const storyName = location.state?.story;

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
                videoElement.pause();
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
        const baseVoiceName = voice.name.split(" - ")[0];
        const videoUrl = voiceVideos[baseVoiceName];
        if (videoUrl) {
            setVideoSrc(videoUrl);
        }
        if (isPlaying) {
            synthRef.current.cancel();
            setIsPlaying(false);
            if (videoElement) {
                videoElement.pause();
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

    // Stop audio and video if the user navigates away from the Books page
    useEffect(() => {
        const stopAudioVideo = () => {
            synthRef.current.cancel(); // Stop audio
            setIsPlaying(false);
            if (videoElement) {
                videoElement.pause(); // Pause video
            }
        };

        if (location.pathname !== "/books") {
            stopAudioVideo();
        }

        return () => stopAudioVideo(); // Cleanup when component unmounts
    }, [location.pathname]);

    const toggleVideoContainerSize = () => {
        setIsVideoMaximized((prev) => !prev);
    };

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
                            videoElement.play();
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
                                <div className="pageflip"></div>{" "}
                                {/* Add the pageflip element here */}
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
                <div
                    className={`video-container ${
                        isVideoMaximized ? "maximized" : "minimized"
                    }`}
                >
                    <button
                        className="close-video-button"
                        onClick={() => {
                            setVideoSrc("");
                            if (videoElement) {
                                videoElement.pause();
                            }
                        }}
                    >
                        X
                    </button>
                    <video
                        src={videoSrc}
                        ref={setVideoElement}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <button
                        onClick={toggleVideoContainerSize}
                        className="toggle-size-button"
                    >
                        {isVideoMaximized ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="black"
                                className="bi bi-arrows-angle-contract"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zm15.656-15.656a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-2.768l4.096-4.096a.5.5 0 0 0 0-.707z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-arrows-angle-expand"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlipBook;
