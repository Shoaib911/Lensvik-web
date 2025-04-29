import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import {
  createDetector,
  SupportedModels,
} from "@tensorflow-models/face-landmarks-detection";
import "@mediapipe/face_mesh";

let detector = null;
const bufferSize = 5;
const stabilityThreshold = 2; // number of times the same suggestion must appear before accepting

const FindYourFit = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [frameSize, setFrameSize] = useState(null);
  const [status, setStatus] = useState("Click button to start");

  const suggestionBuffer = useRef([]);
  const lastAcceptedSuggestion = useRef(null);

  const REAL_IRIS_SIZE_MM = 11.7;
  const IDEAL_IRIS_PX = 10.5;
  const TOLERANCE = 0.04;

  const LEFT_IRIS = [474, 475, 476, 477];
  const LEFT_CHEEK = 234;
  const RIGHT_CHEEK = 454;
  const LEFT_EYE_CENTER = 468;
  const RIGHT_EYE_CENTER = 473;
  const NOSE_TIP = 1;

  const startDetection = async () => {
    setStatus("Loading model...");
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
        setStatus("Detecting...");
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
      predictIrises: true,
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Oval guide
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 30;
    const radiusX = canvas.width * 0.2;
    const radiusY = canvas.height * 0.32;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (faces.length > 0) {
      const keypoints = faces[0].keypoints;
      const leftEye = keypoints[LEFT_EYE_CENTER];
      const rightEye = keypoints[RIGHT_EYE_CENTER];
      const nose = keypoints[NOSE_TIP];

      const eyeAngleRad = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
      const eyeAngleDeg = eyeAngleRad * (180 / Math.PI);
      const isFaceStraight = Math.abs(eyeAngleDeg) < 5;

      const dx = nose.x - centerX;
      const dy = nose.y - centerY;
      const isInsideOval = (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;

      const irisPoints = LEFT_IRIS.map((idx) => keypoints[idx]);
      const xCoords = irisPoints.map((p) => p.x);
      const irisDiameterPixels = Math.max(...xCoords) - Math.min(...xCoords);

      const leftCheek = keypoints[LEFT_CHEEK];
      const rightCheek = keypoints[RIGHT_CHEEK];
      const faceWidthPixels = Math.sqrt(
        Math.pow(leftCheek.x - rightCheek.x, 2) +
        Math.pow(leftCheek.y - rightCheek.y, 2)
      );

      for (const p of [leftCheek, rightCheek, leftEye, rightEye, nose, ...irisPoints]) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }

      const tolerancePx = IDEAL_IRIS_PX * TOLERANCE;
      const isWithinTolerance =
        irisDiameterPixels >= (IDEAL_IRIS_PX - tolerancePx) &&
        irisDiameterPixels <= (IDEAL_IRIS_PX + tolerancePx);
      const distanceDiff = ((irisDiameterPixels - IDEAL_IRIS_PX) / IDEAL_IRIS_PX) * 100;

      ctx.fillStyle = isWithinTolerance ? "lime" : "red";
      ctx.font = "bold 18px Arial";
      ctx.fillText(`Iris Size: ${irisDiameterPixels.toFixed(1)}px`, 10, 30);
      ctx.fillText(
        isWithinTolerance
          ? "✅ Distance Locked!"
          : irisDiameterPixels > IDEAL_IRIS_PX
          ? "🔻 Too Close - Move Back"
          : "🔺 Too Far - Move Forward",
        10,
        60
      );
      ctx.fillText(`Distance Diff: ${distanceDiff.toFixed(2)}%`, 10, 90);
      ctx.fillText(`Face Angle: ${eyeAngleDeg.toFixed(2)}°`, 10, 120);

      if (isWithinTolerance && isInsideOval && isFaceStraight && irisDiameterPixels > 0) {
        const mmPerPixel = REAL_IRIS_SIZE_MM / irisDiameterPixels;
        const faceWidthMm = faceWidthPixels * mmPerPixel;

        let currentSuggestion = "";
        if (faceWidthMm < 130) currentSuggestion = "Extra-small";
        else if (faceWidthMm <= 135) currentSuggestion = "Small";
        else if (faceWidthMm <= 140) currentSuggestion = "Medium";
        else if (faceWidthMm <= 150) currentSuggestion = "Large";
        else currentSuggestion = "Extra-large";

        suggestionBuffer.current.push(currentSuggestion);
        if (suggestionBuffer.current.length > bufferSize) {
          suggestionBuffer.current.shift(); // remove oldest
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
          setStatus("✔ Frame size detected!");
        }

        ctx.fillStyle = "cyan";
        ctx.fillText(`Face Width: ${faceWidthMm.toFixed(1)} mm`, 10, 150);
        ctx.fillText(`Frame Size: ${topSuggestion}`, 10, 180);
      } else {
        suggestionBuffer.current = [];
        setStatus("❗ Keep face straight & inside guide.");
      }
    } else {
      setStatus("❗ Face not detected. Adjust lighting or move closer.");
    }

    requestAnimationFrame(detectFace);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h2 className="text-2xl mb-4 font-bold">Find Your Frame Size</h2>
      <button
        onClick={startDetection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Start Frame Size Detection
      </button>
      <p className="mb-4">{status}</p>

      <div className="relative w-full max-w-md">
        <video
          ref={videoRef}
          className="rounded-lg shadow-md w-full"
          autoPlay
          muted
          playsInline
          style={{ position: "relative", zIndex: 1 }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 2 }}
        />
      </div>

      {frameSize && (
        <div className="mt-5 text-center">
          <h3 className="text-xl font-semibold">
            Face Width: {frameSize.faceWidthMm} mm
          </h3>
          <h3 className="text-xl font-semibold">
            Suggested Frame Size: {frameSize.sizeSuggestion}
          </h3>
        </div>
      )}
    </div>
  );
};

export default FindYourFit;
