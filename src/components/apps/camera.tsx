import { useEffect } from 'react';
import { APP_DATA_TYPE } from "@/data/const";
import { Window } from './window';

interface CameraProps {
    data: APP_DATA_TYPE;
}

export function Camera({ data }: CameraProps) {
    useEffect(() => {
        const videoElement = document.getElementById("videoElement") as HTMLVideoElement;
        let firstInteractionDone = false;

        //Handle the zoom effect on the video.
        function handleZoom(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            const zoomLevel = parseFloat(event.currentTarget.getAttribute("data-zoom") || "1");
            const videoContainer = document.querySelector(".imageContainer video");
            if (videoContainer) {
                (videoContainer as HTMLVideoElement).style.transform = `scale(${zoomLevel})`;
            }
            const buttons = document.querySelectorAll(".controls button");
            buttons.forEach((btn) => btn.classList.remove("active"));
            event.currentTarget.classList.add("active");
        }

        // Attach the handleZoom function to all buttons that have the data-zoom attribute
        const zoomButtons = document.querySelectorAll<HTMLButtonElement>("button[data-zoom]");
        zoomButtons.forEach((button) => {
            button.addEventListener("click", handleZoom);
        });

        //Attach an event listener to the switch camera button
        const switchCameraButton = document.querySelector<HTMLButtonElement>(".switchCamera");
        if (switchCameraButton) {
            switchCameraButton.addEventListener("click", function () {
                if (!firstInteractionDone) {
                    if (videoElement) {
                        videoElement.play();
                        firstInteractionDone = true;
                    }
                }

                const isWebcam = videoElement?.getAttribute("data-iswebcam") === "true";
                if (videoElement) {
                    videoElement.classList.add("flipping-out");
                    var x = false
                    videoElement.onanimationend = () => {
                        if (x) {
                            if (videoElement.srcObject) {
                                const tracks = (videoElement.srcObject as MediaStream).getTracks();
                                tracks.forEach((track) => track.stop());
                            }
                            videoElement.srcObject = null;
                            videoElement.setAttribute("crossorigin", "anonymous");
                            
                            videoElement.src = "https://s3.amazonaws.com/www-inside-design/uploads/2014/08/video-blog-post-v21.gif";
                            videoElement.setAttribute("data-iswebcam", "false");
                            videoElement.classList.remove("flipping-out");
                            videoElement.classList.add("flipping-in");
                            videoElement.play();
                            
                        } else {
                          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                            navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } } })
                                .then(function (stream) {
                                    if (videoElement) {
                                        videoElement.setAttribute("crossorigin", "anonymous");
                                        videoElement.srcObject = stream;
                                        videoElement.setAttribute("data-iswebcam", "true");
                                        videoElement.classList.remove("flipping-out");
                                        videoElement.classList.add("flipping-in");
                                        videoElement.play();
                                    }
                                })
                                .catch(function (err) {
                                    console.error("Error accessing the camera", err);
                                });
                        } else {
                            console.error("Your browser does not support getUserMedia API");
                        }
                        
                        }
                        // On animation end, remove the flipping-in class
                        videoElement.onanimationend = () => {
                            if (videoElement) {
                                videoElement.classList.remove("flipping-in");
                            }
                        };
                    };
                }
            });
        }
        function dataURLtoBlob(dataURL: string) {
          const byteString = atob(dataURL.split(',')[1]);
          const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: mimeString });
      }
      
      // Download photo function
      function downloadPhoto(dataURL: string, fileName: string) {
          const blob = dataURLtoBlob(dataURL);
          fetch('your-server-endpoint', {
            method: 'POST',
            body: dataURLtoBlob(dataURL)
        })
          // const url = window.URL.createObjectURL(blob);
          // const a = document.createElement('a');
          // a.href = url;
          // a.download = fileName;
          // document.body.appendChild(a);
          // a.click();
          // window.URL.revokeObjectURL(url);
      }
        // Attach an event listener to the camera button for capturing a snapshot from the video
        const cameraButton = document.querySelector<HTMLButtonElement>(".camerabutton");
        if (cameraButton) {
            cameraButton.addEventListener("click", function () {
                const flashElement = document.querySelector<HTMLElement>(".flash");
                if (flashElement) {
                    flashElement.classList.add("shutterClick");
                    flashElement.addEventListener("animationend", function () {
                        flashElement.classList.remove("shutterClick");
                    });
                    const canvas = document.createElement("canvas");
                    if (videoElement) {
                        canvas.width = videoElement.videoWidth;
                        canvas.height = videoElement.videoHeight;
                        const ctx = canvas.getContext("2d");
                        if (ctx && videoElement) {
                            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                            const thumbnailDataURL = canvas.toDataURL("image/jpeg");
                            console.log(thumbnailDataURL)
                            downloadPhoto(thumbnailDataURL, "snapshot.jpg");
                            const thumbnailImage = document.querySelector<HTMLImageElement>(".thumbnail img");
                            if (thumbnailImage) {
                                thumbnailImage.src = thumbnailDataURL;
                            }
                        }
                    }
                }
            });
        }

        // Attach an event listener to the thumbnail button
        const thumbnailButton = document.querySelector<HTMLButtonElement>(".thumbnail");
        if (thumbnailButton) {
            thumbnailButton.addEventListener("click", function () {
                const heart = document.createElement("span");
                heart.classList.add("heart");
                heart.textContent = "😉";
                thumbnailButton.appendChild(heart);
                setTimeout(() => {
                    heart.style.bottom = "100%";
                    heart.style.opacity = "1";
                    heart.style.fontSize = "30px";
                }, 10);
                setTimeout(() => {
                    thumbnailButton.removeChild(heart);
                }, 2000);
            });
        }

        // Cleanup function
        return () => {
            // Remove event listeners or perform any cleanup here
        };
    }, []);

    return (
        <Window data={data}>
            <div className="imageContainer">
                <div className="imageContainerInner">
                    <video id="videoElement" src="https://s3.amazonaws.com/www-inside-design/uploads/2014/08/video-blog-post-v21.gif" autoPlay loop muted data-iswebcam="false" poster="https://static.thenounproject.com/png/282960-200.png" crossOrigin="anonymous" preload="metadata" ></video>
                    <div className="flash"></div>
                </div>
                <div className="controls">
                    <button data-zoom="1" className="active">.5<span>&times;</span></button>
                    <button data-zoom="1.5">1<span>&times;</span></button>
                    <button data-zoom="2.5">3<span>&times;</span></button>
                </div>
                <div className="otherControls">
                    <button className="thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg1mQfgebfAAZ3tZAzsuu-Fm1dZzU0FW9O9Bv_rL7alw&s" alt="" />
                    </button>
                    <button className="camerabutton"></button>
                    <button className="switchCamera">
                        <span className="material-symbols-outlined">
                            <img width="100" height="100" src="https://img.icons8.com/ios-filled/ffffff/replace.png" alt="replace" />
                        </span>
                    </button>
                </div>
            </div>
        </Window>
    );
}
