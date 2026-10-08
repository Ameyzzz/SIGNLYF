```javascript
const textInput =
    document.getElementById("speech-text");

const microphoneButton =
    document.getElementById("microphone-button");

const micStatus =
    document.getElementById("mic-status");

const translateButton =
    document.getElementById("translate-button");

const clearButton =
    document.getElementById("clear-button");

const translationStatus =
    document.getElementById("translation-status");

const animationStatus =
    document.getElementById("animation-status");

const playButton =
    document.getElementById("play-button");

const pauseButton =
    document.getElementById("pause-button");

const replayButton =
    document.getElementById("replay-button");


/* =========================
   SPEECH RECOGNITION
========================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

let isListening = false;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-US";


    recognition.onstart = () => {

        isListening = true;

        microphoneButton.classList.add(
            "recording"
        );

        microphoneButton.querySelector(
            "span:last-child"
        ).textContent = "Listening...";

        micStatus.textContent =
            "Speak now...";

    };


    recognition.onresult = event => {

        let finalText = "";

        let interimText = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;


            if (event.results[i].isFinal) {

                finalText += transcript;

            } else {

                interimText += transcript;

            }

        }


        if (finalText) {

            textInput.value =
                finalText.trim();

        }

    };


    recognition.onerror = event => {

        console.error(
            "Speech recognition error:",
            event.error
        );

        micStatus.textContent =
            "Error: " + event.error;

    };


    recognition.onend = () => {

        isListening = false;

        microphoneButton.classList.remove(
            "recording"
        );

        microphoneButton.querySelector(
            "span:last-child"
        ).textContent =
            "Start Speaking";

        micStatus.textContent =
            "Microphone is off";

    };

}


/* =========================
   MICROPHONE BUTTON
========================= */

microphoneButton.addEventListener(
    "click",
    () => {

        if (!recognition) {

            alert(
                "Speech recognition is not supported in this browser."
            );

            return;

        }


        if (isListening) {

            recognition.stop();

        } else {

            recognition.start();

        }

    }
);


/* =========================
   TRANSLATE
========================= */

translateButton.addEventListener(
    "click",
    () => {

        const text =
            textInput.value.trim();


        if (!text) {

            alert(
                "Please type or speak something first."
            );

            return;

        }


        translationStatus.textContent =
            "Processing...";

        animationStatus.textContent =
            "LOADING";


        /*
         * BACKEND INTEGRATION WILL GO HERE.
         *
         * Later:
         *
         * const response = await fetch(
         *     "/api/speech-to-asl",
         *     ...
         * );
         *
         */


        setTimeout(() => {

            translationStatus.textContent =
                "Ready";

            animationStatus.textContent =
                "READY";

            alert(
                "Translation system is not connected yet.\n\n" +
                "The frontend is ready for the ASL animation backend."
            );

        }, 500);

    }
);


/* =========================
   CLEAR
========================= */

clearButton.addEventListener(
    "click",
    () => {

        textInput.value = "";

        translationStatus.textContent =
            "Waiting";

        animationStatus.textContent =
            "READY";

    }
);


/* =========================
   PLAYER CONTROLS
========================= */

playButton.addEventListener(
    "click",
    () => {

        animationStatus.textContent =
            "PLAYING";

        translationStatus.textContent =
            "Animation playing";

    }
);


pauseButton.addEventListener(
    "click",
    () => {

        animationStatus.textContent =
            "PAUSED";

    }
);


replayButton.addEventListener(
    "click",
    () => {

        animationStatus.textContent =
            "REPLAYING";

        translationStatus.textContent =
            "Animation replaying";

    }
);
```
