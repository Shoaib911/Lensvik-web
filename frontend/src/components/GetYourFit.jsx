import { useState, useRef, useEffect} from "react";

const GetYourFit = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [fitSize, setFitSize] = useState("");
  const [distanceMessage, setDistanceMessage] = useState("Align your face properly.");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let stream = null; // To store the camera stream for cleanup

  const API_KEY = "L9O1kZDJQ448G6xRGKpBMVl5nyQ4_Ctv";
  const API_SECRET = "HwdbY4YDV6xTvnidVfVDwQa5LtqSv1jho";

  // Open Camera
  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Please allow camera access.");
      setIsCameraOpen(false);
    }
  };

  // Close Camera
  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  // Capture Image & Process
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Capture frame from video
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");

    sendToFaceAPI(imageData);
    closeCamera();
  };

  // Send Image to Face++ API
  const sendToFaceAPI = async (imageData) => {
    const blob = await fetch(imageData).then((res) => res.blob());
    const formData = new FormData();
    formData.append("api_key", API_KEY);
    formData.append("api_secret", API_SECRET);
    formData.append("image_file", blob);
    formData.append("return_landmark", "1");

    try {
      const response = await fetch("https://api-us.faceplusplus.com/facepp/v3/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.faces && data.faces.length > 0) {
        const faceWidth = calculateFaceWidth(data.faces[0].landmark);
        determineGlassesSize(faceWidth);
      } else {
        alert("No face detected! Please try again.");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image. Please try again.");
    }
  };

  // Calculate Face Width
  const calculateFaceWidth = (landmarks) => {
    const leftCheek = landmarks.contour_left1;
    const rightCheek = landmarks.contour_right1;
    const width = Math.sqrt(
      Math.pow(rightCheek.x - leftCheek.x, 2) + Math.pow(rightCheek.y - leftCheek.y, 2)
    );

    // Display face distance guidance
    if (width < 100) {
      setDistanceMessage("Move closer to the camera.");
    } else if (width > 150) {
      setDistanceMessage("Move slightly back.");
    } else {
      setDistanceMessage("Perfect! Capturing...");
    }

    return width;
  };

  // Determine Glasses Size
  const determineGlassesSize = (faceWidth) => {
    let size = "";
    if (faceWidth < 120) size = "Small";
    else if (faceWidth >= 120 && faceWidth <= 140) size = "Medium";
    else size = "Large";

    setFitSize(size);
    setIsResultOpen(true);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={openCamera}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Get Your Fit
      </button>

      {/* Camera Popup */}
      {isCameraOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center relative">
            <button
              onClick={closeCamera}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              ✕
            </button>
            <p className="mb-2 text-lg font-bold">Align Your Face</p>
            <p className="text-sm text-gray-600">{distanceMessage}</p>
            <video ref={videoRef} autoPlay className="w-full h-56 mt-2 mx-auto rounded-md"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <button
              onClick={captureImage}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Capture
            </button>
          </div>
        </div>
      )}

      {/* Result Popup */}
      {isResultOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center relative">
            <button
              onClick={() => setIsResultOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              ✕
            </button>
            <p className="text-xl font-bold">Your Fit Size</p>
            <p className="text-2xl font-semibold text-blue-600 mt-2">{fitSize}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetYourFit;
