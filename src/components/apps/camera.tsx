import { useEffect } from 'react';
import { APP_DATA_TYPE } from "@/data/const";
import { Window } from './window';
import { gettoken  } from "../../../utils/modules"
import { BACKEND_LINK } from "@/data/const"
interface CameraProps {
    data: APP_DATA_TYPE;
}

export function Camera({ data }: CameraProps) {
    var tmp:any = null;
    const token = gettoken('token');
    useEffect(() => {
        const videoElement = document.getElementById("videoElement") as HTMLVideoElement;
        const switchCameraButton = document.querySelector<HTMLButtonElement>(".switchCamera");
        if (switchCameraButton) {
            switchCameraButton.addEventListener("click", function () {
               

                const isWebcam = videoElement?.getAttribute("data-iswebcam") === "true";
                if (videoElement) {
                    videoElement.classList.add("flipping-out");
                    var x = false
                    videoElement.onanimationend = () => {
                      
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
                        }

                        videoElement.onanimationend = () => {
                            if (videoElement) {
                                videoElement.classList.remove("flipping-in");
                            }
                        };
                    };
                }
            });
        }
        
          function uploadfilep(imageFile: File) {
            const formData = new FormData();
            formData.append('photo', imageFile);
          
            fetch(BACKEND_LINK+'api/save-camera-photo', {//add-chatstorie
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': token 
            },
            })
            .then(response => response.json())
            .then(data => {
              console.log('Photo upload response:', data);
            })
            .catch(error => {
              console.error('Error uploading photo:', error);
            });
          }

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
                           
                            const fileObject = dataURLtoFile(thumbnailDataURL);
                            console.log(fileObject)
                            // uploadPhoto(thumbnailDataURL);
                            uploadfilep(fileObject);
                        }
                    }
                }
            });
        }

        // Attach an event listener to the thumbnail button
        const thumbnailButton = document.querySelector<HTMLButtonElement>(".thumbnail");
        if (thumbnailButton) {
            thumbnailButton.addEventListener("click", function () {
            });
        }
    }, []);
    
    function dataURLtoFile(dataURL) {
        const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, "");
        const mimeType = dataURL.split(';')[0].split(':')[1];
        const byteString = atob(base64Data);
        const buffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(buffer);
        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([buffer], { type: mimeType });
        const filename = "image.jpg"; 
      
        return new File([blob], filename, { type: mimeType });
      }
      
      
    return (
        <Window data={data}>
            <div className="imageContainer">
                <div className="imageContainerInner">
                    <video id="videoElement" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5XRVQ7xxHNWBa1Hj590AOOFQpP2FxYemRENy37Igew&s" autoPlay loop muted data-iswebcam="false" poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5XRVQ7xxHNWBa1Hj590AOOFQpP2FxYemRENy37Igew&s" crossOrigin="anonymous" preload="metadata" ></video>
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
