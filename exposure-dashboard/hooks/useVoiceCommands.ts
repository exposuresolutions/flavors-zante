"use client";

import { useState, useEffect } from "react";

type CommandHandler = (args: string) => void;

interface VoiceCommands {
    [key: string]: CommandHandler;
}

export function useVoiceCommands(commands: VoiceCommands) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [lastCommand, setLastCommand] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Text-to-Speech function
    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to find a good female/futuristic voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
            if (preferredVoice) utterance.voice = preferredVoice;
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.warn("Speech recognition not supported in this browser.");
            return;
        }

        // @ts-ignore
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = async (event: any) => {
            const current = event.resultIndex;
            const transcriptText = event.results[current][0].transcript.toLowerCase();
            setTranscript(transcriptText);

            let matched = false;
            // Simple command matching
            Object.keys(commands).forEach((commandKey) => {
                if (transcriptText.includes(commandKey.toLowerCase())) {
                    setLastCommand(commandKey);
                    matched = true;
                    // Extract arguments if any
                    const args = transcriptText.replace(commandKey.toLowerCase(), "").trim();
                    commands[commandKey](args);
                }
            });

            // "Connect to You" - AI Fallback
            // Triggers if no command matched OR if user specifically says "hey exposure"
            if (!matched || transcriptText.includes("hey exposure")) {
                setIsProcessing(true);
                setAiResponse("Connecting to Neural Core...");
                
                try {
                    const response = await fetch('/api/ai', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: transcriptText })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        setAiResponse(data.message);
                        speak(data.message);
                    } else {
                        setAiResponse("System Error: " + data.message);
                    }
                } catch (error) {
                    setAiResponse("Connection to AI Core Failed.");
                } finally {
                    setIsProcessing(false);
                }
            }
        };

        if (isListening) {
            recognition.start();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening, commands]);

    const toggleListening = () => setIsListening(!isListening);

    return {
        isListening,
        transcript,
        lastCommand,
        aiResponse,
        isProcessing,
        toggleListening
    };
}
