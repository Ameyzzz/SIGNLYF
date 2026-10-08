const camera = document.getElementById("camera");
const cameraPlaceholder = document.getElementById("camera-placeholder");

const startButton = document.getElementById("start-camera");
const stopButton = document.getElementById("stop-camera");

const cameraStatus = document.getElementById("camera-status");
const detectionStatus = document.getElementById("detection-status");

const recognizedText = document.getElementById("recognized-text");

const speakButton = document.getElementById("speak-button");
const clearButton = document.getElementById("clear-button");


let cameraStream = null;


/* =========================
   START CAMERA
========================= */

async function startCamera() {

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });


        camera.srcObject = cameraStream;

        camera.style.display = "block";

        cameraPlaceholder.style.display = "none";


        cameraStatus.textContent = "ONLINE";

        cameraStatus.style.color = "#7cff6b";

        detectionStatus.textContent = "Ready";


        console.log("Camera started.");

    } catch (error) {

        console.error(error);

        cameraStatus.textContent = "ERROR";

        cameraStatus.style.color = "#ff5f5f";

        detectionStatus.textContent = "Camera access denied.";

        alert(
            "SIGNLYF needs access to your camera to detect ASL signs."
        );

    }
}


/* =========================
   STOP CAMERA
========================= */

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;

    }


    camera.srcObject = null;

    camera.style.display = "none";

    cameraPlaceholder.style.display = "flex";


    cameraStatus.textContent = "OFFLINE";

    cameraStatus.style.color = "#ff5f5f";

    detectionStatus.textContent = "Waiting";

}


/* =========================
   TEXT TO SPEECH
========================= */

function speakText() {

    const text = recognizedText.textContent.trim();


    if (
        !text ||
        text === "Waiting for signs..."
    ) {

        return;

    }


    if (!("speechSynthesis" in window)) {

        alert(
            "Text-to-speech is not supported in this browser."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}


/* =========================
   CLEAR
========================= */

function clearText() {

    recognizedText.textContent =
        "Waiting for signs...";

    detectionStatus.textContent =
        "Waiting";

}


/* =========================
   EVENTS
========================= */

startButton.addEventListener(
    "click",
    startCamera
);


stopButton.addEventListener(
    "click",
    stopCamera
);


speakButton.addEventListener(
    "click",
    speakText
);


clearButton.addEventListener(
    "click",
    clearText
);