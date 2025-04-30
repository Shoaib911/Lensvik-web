import { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import {
  createDetector,
  SupportedModels,
} from "@tensorflow-models/face-landmarks-detection";
import { assets } from "../assets/assets";

let detector = null;
const bufferSize = 5;
const stabilityThreshold = 2;

const FindYourFit = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [frameSize, setFrameSize] = useState(null);
  const [status, setStatus] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [detectionStarted, setDetectionStarted] = useState(false);

  const suggestionBuffer = useRef([]);
  const lastAcceptedSuggestion = useRef(null);

  // const LEFT_CHEEK = 234;
  // const RIGHT_CHEEK = 454;
  // const LEFT_EYE_CENTER = 468;
  // const RIGHT_EYE_CENTER = 473;
  // const NOSE_TIP = 1;

  const handleStartClick = () => {
    setShowGuide(true);
  };

  const confirmStart = () => {
    setShowGuide(false);
    setDetectionStarted(true);
    startDetection();
  };

  const cancelDetection = () => {
    setShowGuide(false);
    setDetectionStarted(false);
    setFrameSize(null);
    setStatus("");
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const startDetection = async () => {
    setStatus("Initializing model...");
    await tf.setBackend("webgl");
    await tf.ready();

    if (!detector) {
      detector = await createDetector(SupportedModels.MediaPipeFaceMesh, {
        runtime: "mediapipe",
        refineLandmarks: true,
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh`,
      });
    }

    const video = videoRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      video.onloadedmetadata = async () => {
        await video.play();
        setStatus("Align your face inside the green oval");
        detectFace();
      };
    } catch (err) {
      console.error("Camera error:", err);
      setStatus("❌ Could not access camera");
    }
  };

  const detectFace = async () => {
    if (!detector || !videoRef.current || videoRef.current.readyState !== 4) {
      requestAnimationFrame(detectFace);
      return;
    }
  
    const faces = await detector.estimateFaces(videoRef.current, {
      flipHorizontal: false,
      predictIrises: false,
    });
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    const centerX = canvas.width / 2;
const centerY = canvas.height / 2 + 30;
const radiusX = canvas.width * 0.35;  // previously 0.2
const radiusY = canvas.height * 0.45; // previously 0.32
  
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.stroke();
  
    if (faces.length > 0) {
      const keypoints = faces[0].keypoints;
      const leftEye = keypoints[468];
      const rightEye = keypoints[473];
      const nose = keypoints[1];
      const leftCheek = keypoints[234];
      const rightCheek = keypoints[454];
  
      const redPoints = [leftCheek, rightCheek, leftEye, rightEye, nose];
  
      let allDotsInsideOval = redPoints.every(p => {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        return (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;
      });
  
      redPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });
  
      const eyeAngleRad = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
      const eyeAngleDeg = eyeAngleRad * (180 / Math.PI);
      const isFaceStraight = Math.abs(eyeAngleDeg) < 5;
  
      const faceWidthPixels = Math.sqrt(
        Math.pow(leftCheek.x - rightCheek.x, 2) + Math.pow(leftCheek.y - rightCheek.y, 2)
      );
  
      const minPx = 175;
      const maxPx = 185;
  
      if (!allDotsInsideOval) {
        setStatus("🟢 Please keep your face and red dots inside the oval");
      } else if (faceWidthPixels < minPx || faceWidthPixels > maxPx) {
        setStatus(faceWidthPixels < minPx
          ? "🔺 Too far — move closer"
          : "🔻 Too close — move back slightly");
      } else if (!isFaceStraight) {
        setStatus("🔁 Keep your head straight (0° tilt)");
      } else {
        const mmPerPixel = 140 / 180;
        const faceWidthMm = faceWidthPixels * mmPerPixel;
  
        let currentSuggestion = "";
        if (faceWidthMm < 130) currentSuggestion = "Extra-small";
        else if (faceWidthMm <= 135) currentSuggestion = "Small";
        else if (faceWidthMm <= 140) currentSuggestion = "Medium";
        else if (faceWidthMm <= 150) currentSuggestion = "Large";
        else currentSuggestion = "Extra-large";
  
        suggestionBuffer.current.push(currentSuggestion);
        if (suggestionBuffer.current.length > bufferSize) {
          suggestionBuffer.current.shift();
        }
  
        const suggestionCount = suggestionBuffer.current.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {});
  
        const topSuggestion = Object.entries(suggestionCount).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0];
  
        if (
          topSuggestion !== lastAcceptedSuggestion.current &&
          suggestionCount[topSuggestion] >= stabilityThreshold
        ) {
          lastAcceptedSuggestion.current = topSuggestion;
          setFrameSize({
            faceWidthMm: faceWidthMm.toFixed(1),
            sizeSuggestion: topSuggestion,
          });
          setStatus("✅ Frame size detected!");
        }
  
        ctx.fillStyle = "cyan";
        ctx.font = "bold 18px Arial";
        ctx.fillText(`Face Width: ${faceWidthMm.toFixed(1)} mm`, 10, 30);
        ctx.fillText(`Frame Size: ${topSuggestion}`, 10, 60);
        ctx.fillText(`Face Angle: ${eyeAngleDeg.toFixed(2)}°`, 10, 90);
      }
    } else {
      setStatus("❗ Face not detected. Check lighting.");
    }
  
    requestAnimationFrame(detectFace);
  };
  

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Guide to Glasses Frame Size</h2>
      <p className="text-gray-700 max-w-2xl text-center mb-8 text-sm sm:text-base leading-relaxed">
        A pair of glasses that fits one person’s face with style and comfort might not suit everyone. Each of us has unique facial features that require specific frame measurements to look and feel right. Even if you have found the perfect-looking frame, it may not be suitable when measured against your actual size. Use the tools below to find your ideal fit.
      </p>
  
      <button
        onClick={handleStartClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
      >
        Find Your Size
      </button>
  
      {/* Guide Popup */}
      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md text-gray-800">
            <h3 className="text-xl font-bold mb-3">Before You Begin</h3>
            <ul className="list-disc list-inside text-sm mb-4 space-y-2">
              <li>Ensure your face and all red tracking points stay within the green oval.</li>
              <li>Keep your head level (avoid tilt).</li>
              <li>Position yourself approximately 75–80 cm from the camera.</li>
              <li>Use balanced lighting; avoid direct backlight or heavy shadows.</li>
              <li><strong>Note:</strong> This AI-based tool provides suggestions, not guarantees. For accuracy, refer to the manual guide below.</li>
            </ul>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDetection}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmStart}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                OK, Start
              </button>
            </div>
          </div>
        </div>
      )}
  
  {detectionStarted && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-[720px] p-6 relative">
      <button
        onClick={cancelDetection}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
      >
        ✕
      </button>

      <h3 className="text-xl font-bold text-center mb-2">Live Frame Size Detection</h3>
      <p className="text-center text-sm text-gray-600 mb-3">{status}</p>

      {/* Responsive fixed-aspect box */}
      <div className="relative w-full overflow-hidden bg-black rounded-lg shadow" style={{ aspectRatio: '4 / 3' }}>
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-contain"
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {frameSize && (
        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold text-gray-700">
            Face Width: {frameSize.faceWidthMm} mm
          </h4>
          <p className="text-base font-semibold mt-1 text-gray-900">
            Suggested Frame Size: <span className="text-blue-600">{frameSize.sizeSuggestion}</span>
          </p>
        </div>
      )}
    </div>
  </div>
)}


  
      {/* Manual Credit Card Guide */}
      <div className="mt-12 w-full max-w-4xl text-center">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Manual Guide: Credit Card Method</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          Don’t have access to a webcam? You can still estimate your frame size using a standard credit or debit card. Stand in front of a mirror and follow the steps below.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-md shadow-sm">
            <p className="font-semibold mb-2">1. Take a Credit/Debit Card</p>
            <img src={assets.card_1} alt="Credit card step" className="w-full max-w-xs mx-auto" />
            <p className="text-xs mt-3 text-gray-600">This is approximately the width of a medium-sized frame.</p>
          </div>
  
          <div className="p-4 border rounded-md shadow-sm">
            <p className="font-semibold mb-2">2. Stand in Front of a Mirror</p>
            <img src={assets.card_2} alt="Stand in mirror" className="w-full max-w-xs mx-auto" />
            <p className="text-xs mt-3 text-gray-600">Place one edge of the card at the center of your nose and check where it reaches relative to your eye.</p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 border rounded-md shadow text-center">
            <img src={assets.card_3} alt="Small size" className="w-48 mx-auto mb-4" />
            <p className="text-base text-gray-700 mb-2">If the card extends beyond the corner of the eye</p>
            <span className="inline-block bg-gray-100 text-base font-semibold px-4 py-2 rounded">Size is SMALL</span>
          </div>
  
          <div className="p-6 border rounded-md shadow text-center">
            <img src={assets.card_4} alt="Medium size" className="w-48 mx-auto mb-4" />
            <p className="text-base text-gray-700 mb-2">If the card roughly touches the corner of the eye</p>
            <span className="inline-block bg-gray-100 text-base font-semibold px-4 py-2 rounded">Size is MEDIUM</span>
          </div>
  
          <div className="p-6 border rounded-md shadow text-center">
            <img src={assets.card_5} alt="Large size" className="w-48 mx-auto mb-4" />
            <p className="text-base text-gray-700 mb-2">If the card doesn’t reach the corner of the eye</p>
            <span className="inline-block bg-gray-100 text-base font-semibold px-4 py-2 rounded">Size is LARGE</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default FindYourFit;
