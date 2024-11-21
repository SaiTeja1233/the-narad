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
    useEffect(() => {
        if (videoElement && videoSrc) {
            isPlaying ? videoElement.play() : videoElement.pause();
        }
    }, [isPlaying, videoSrc, videoElement]);
    useEffect(() => {
        return () => {
            if (isPlaying) {
                synthRef.current.cancel();
                setIsPlaying(false);
                if (videoElement) {
                    videoElement.pause();
                }
            }
        };
    }, [isPlaying, videoElement]);

    const handlePlayPause = (htmlContent, pageIndex) => {
        const synth = synthRef.current;

        if (isPlaying) {
            synth.cancel(); // Stop audio
            setIsPlaying(false);
            if (videoElement) {
                videoElement.pause(); // Pause video when audio stops
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
            // Event when audio finishes naturally
            utterance.onend = () => {
                setIsPlaying(false);
                spokenLengthRef.current = 0;
                if (videoElement) {
                    videoElement.pause(); // Pause video when audio finishes
                }
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
                videoElement.play(); // Play video only when audio is playing
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
                        if (isPlaying && videoElement) {
                            videoElement.play(); // Only play video if audio is playing
                        } else if (videoElement) {
                            videoElement.pause(); // Pause video if audio is not playing
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
                    disabled={!selectedVoice} // Disable if no voice selected
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
                            setSelectedVoice(null); // Reset the selected voice to disable play button
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
                                    d="M3.636 0H8v1H4.707L8 4.293 7.293 5 4 1.707V5H3V.5a.5.5 0 0 1 .5-.5h.136zM12 10.5a.5.5 0 0 1 .5-.5h.5v4.5a.5.5 0 0 1-.5.5H8v-1h3.293L8 11.707l.707-.707L12 13.293V10.5z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="white"
                                className="bi bi-arrows-angle-expand"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.828.828v3.75H12V2.207L8.707 5.5 8 4.793 11.293 1.5H9.25V.828h3.578zM4 10.207l-1.5 1.5H2.707L6 8.207l.707.707L4.207 11.5h2.042v1H1.5v-3.75h1v2.042L5.293 9.5 4 10.793z"
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
