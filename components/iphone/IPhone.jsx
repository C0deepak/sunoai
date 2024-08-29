'use client'
import React, { useEffect, useRef, useState } from "react";
import styles from "./IPhone.module.css";
import { CirclePause, Mic } from "lucide-react";
import { Input } from "../ui/input";

const IPhone = () => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [mic, setMic] = useState("default")
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [outputAudioURL, setOutputAudioURL] = useState('');

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            // const audioUrl = URL.createObjectURL(blob);
            // setAudioURL(audioUrl);
            handleAudioUpload(blob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handleAudioUpload = async (audioBlob) => {
        if (!audioBlob) {
            console.error("No audio file selected.");
            return;
        }

        setMic("thinking")
        const formData = new FormData();
        formData.append("file", audioBlob);

        try {
            const response = await fetch('https://api.sarvam.ai/speech-to-text-translate', {
                method: 'POST',
                headers: {
                    'api-subscription-key': '46a5a203-f8a3-456a-a928-0a1a88c346bc',
                },
                body: formData,
            });

            const result = await response.json();
            setTranscript(result.transcript);
            console.log("Transcript:", result.transcript);

            handleTextToSpeech(result.transcript);
        } catch (error) {
            console.error("Error during upload:", error);
        }
    };

    const handleTextToSpeech = async (transcript) => {
        const textToConvert = transcript.trim();
        const ttsData = {
            inputs: [textToConvert],
            target_language_code: "gu-IN", // Adjust language code as needed
            speaker: "meera",
            "enable_preprocessing": true,
            "pace" : 1.3,
        };

        try {
            const response = await fetch('https://api.sarvam.ai/text-to-speech', {
                method: 'POST',
                headers: {
                    'api-subscription-key': '46a5a203-f8a3-456a-a928-0a1a88c346bc',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ttsData),
            });

            const result = await response.json();
            const base64Audio = result.audios;

            // const audioBlob = base64ToBlob(base64Audio, 'audio/wav');
            const audioBlob = new Blob([Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setOutputAudioURL(audioUrl);
            setMic('result');
        } catch (error) {
            console.error("Error during TTS:", error);
        }
    };

    const base64ToBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };


    useEffect(() => {
        const updateTime = () => {
            const dateObj = new Date();

            const hour =
                dateObj.getHours() < 13
                    ? dateObj.getHours() === 0
                        ? 12
                        : dateObj.getHours()
                    : dateObj.getHours() - 12;

            const minutes =
                dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();

            const formattedDate = dateObj.toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
            });

            setTime(`${hour}:${minutes}`);
            setDate(formattedDate);
            requestAnimationFrame(updateTime);
        };

        updateTime();

        return () => {
            cancelAnimationFrame(updateTime);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.iphone}>
                <div className={styles.buttons}>
                    <div className={styles.silent}></div>
                    <div className={styles.sleep}></div>
                    <div className={styles.volUp}></div>
                    <div className={styles.volDown}></div>
                </div>
                <div className={styles.top}>
                    <div className={styles.blackBar}></div>
                    <div className={styles.iphoneTop}></div>
                </div>
                <div className={styles.components}>
                    <div className={styles.speaker}></div>
                    <div className={styles.camera}>
                        <div className={styles.shineLeft}></div>
                        <div className={styles.shineRight}></div>
                    </div>
                </div>
                <div className={styles.topBar}></div>
                <div className={styles.bottomBar}></div>
                <div className={styles.screen}>
                    {/* <video loop autoPlay muted  className="h-full object-cover">
                        <source src="https://videos.pexels.com/video-files/3371612/3371612-hd_1080_1920_30fps.mp4" type="video/mp4"/>
                    </video> */}
                    <div className={styles.stuff}>
                        <div className={styles.service}>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                        </div>
                        <div className={styles.battery}>
                            <div className={styles.nub}></div>
                            <div className={styles.energy}></div>
                        </div>
                        <div className={styles.lockCarrier}>AT&T</div>
                        <div className={styles.lockLock}></div>
                        <div className={styles.info}>
                            <div className={styles.lockTime}>{time}</div>
                            <div className={styles.lockDate}>{date}</div>
                        </div>
                        <div className={styles.mic}>
                            {mic === "default" && (
                                <div className="cursor-pointer" onClick={isRecording ? stopRecording : startRecording}>
                                    {isRecording ?
                                        <div className="flex flex-col gap-16 items-center justify-center w-full">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1200px-Apple_logo_white.svg.png"
                                                alt="Animated"
                                                className={styles.animatedImage} />
                                            <CirclePause size={40} />
                                        </div>
                                        :
                                        <Mic size={40} />
                                    }
                                </div>
                            )}
                            {mic === "thinking" && (
                                <div className="flex flex-col gap-16 items-center justify-center w-full">
                                    <img src="https://static-00.iconduck.com/assets.00/three-dots-icon-2048x512-oi0pr1sg.png"
                                        alt="Animated"
                                        className={styles.animatedImage} />
                                    <p className="text-lg">Thinking..</p>
                                </div>
                            )}
                            {mic === "result" && (
                                <div className="flex flex-col gap-8 items-center justify-center w-full">
                                    <p className="p-2 bg-white/10">{transcript}</p>
                                    {outputAudioURL && (
                                        <audio controls>
                                            <source src={outputAudioURL} type="audio/wav" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={styles.lockBar}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPhone;
