function openMode(mode) {

    if (mode === "asl-to-speech") {

        window.location.href = "pages/asl-to-speech.html";

    }

    if (mode === "speech-to-asl") {

        window.location.href = "pages/speech-to-asl.html";

    }
}


/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("service-worker.js")
            .then(() => {
                console.log("SIGNLYF service worker registered.");
            })
            .catch(error => {
                console.error(
                    "Service worker registration failed:",
                    error
                );
            });

    });

}
