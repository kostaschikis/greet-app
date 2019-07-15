const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 2,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }
  

navigator.getUserMedia = navigator.getUserMedia 
|| navigator.webkitGetUserMedia 
|| navigator.mozGetUserMedia 
|| navigator.msGetUserMedia;


// DOM Elements
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;


// Try to start video streaming
handTrack.startVideo(video)
    .then(status => {
        // If the video is loaded start the stream
        if(status) {
            navigator.getUserMedia(
                {video: {}}, 
                stream => {
                    video.srcObject = stream;
                    setInterval(detectHand, 1000);
                }, 
                err => console.log(err)
            );
        }
    });

    
// Load handTrack.js model
handTrack.load(modelParams)
.then(loadedModel => {
    model = loadedModel;
});
    

function detectHand() {
    model.detect(video) 
        .then(predictions => {
            console.log(predictions); 
            if(predictions.length > 0 ) {
                audio.volume = 0.5;
                audio.currentTime = 0;
                audio.play();
            }

            /* You can render the predictions by enabling the above line of code */
            //model.renderPredictions(predictions, canvas, context, video);
        });
}