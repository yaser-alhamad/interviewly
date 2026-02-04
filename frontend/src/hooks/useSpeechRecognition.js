import { useState, useEffect, useCallback, useRef } from "react";

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  // Refs to maintain state between renders
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const interimTranscriptRef = useRef("");

  // Check if browser supports speech recognition
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setIsSupported(false);
    }
  }, []);

  // Initialize speech recognition
  const initRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // Event handlers
    recognition.onresult = (event) => {
      let final = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }

      // Update refs
      if (final) {
        finalTranscriptRef.current += final;
      }
      interimTranscriptRef.current = interim;

      // Update state with combined transcript
      setTranscript(finalTranscriptRef.current + interimTranscriptRef.current);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Restart recognition if we're still supposed to be listening
      if (isListening && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Ignore errors if starting again fails
        }
      }
    };

    return recognition;
  }, [isSupported, isListening]);

  const startListening = () => {
    if (!isSupported) return;

    // Initialize recognition if needed
    if (!recognitionRef.current) {
      recognitionRef.current = initRecognition();
    }

    if (recognitionRef.current) {
      // Reset transcript refs
      finalTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      setTranscript("");

      setIsListening(true);

      // Stop any existing recognition first
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore error if there's nothing to stop
      }

      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (!isSupported || !recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
    } catch (e) {
      // Ignore error if recognition is already stopped
    }

    setIsListening(false);
  };

  const resetTranscript = () => {
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
    setTranscript("");
  };

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition;
