import { useEffect, useRef, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const TryOnTesting = () => {
  const [products, setProducts] = useState([]);
  const [selectedTryonImage, setSelectedTryonImage] = useState(null);
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const faceMesh = useRef(null);
  const camera = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching product list.");
    }
  };

  useEffect(() => {
    if (selectedTryonImage) {
      startFaceMesh();
    }
    return () => {
      if (camera.current) camera.current.stop();
    };
  }, [selectedTryonImage]);

  const startFaceMesh = async () => {
    faceMesh.current = new window.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.current.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.current.onResults(onResults);

    camera.current = new window.Camera(webcamRef.current, {
      onFrame: async () => {
        await faceMesh.current.send({ image: webcamRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.current.start();
  };

  const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (
      results.multiFaceLandmarks &&
      results.multiFaceLandmarks.length > 0 &&
      selectedTryonImage
    ) {
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const landmarks = results.multiFaceLandmarks[0];
      const leftTemple = landmarks[234];
      const rightTemple = landmarks[454];
      const nose = landmarks[6];

      const x1 = leftTemple.x * canvasRef.current.width;
      const y1 = leftTemple.y * canvasRef.current.height;
      const x2 = rightTemple.x * canvasRef.current.width;
      const y2 = rightTemple.y * canvasRef.current.height;
      const centerX = nose.x * canvasRef.current.width;
      const centerY = nose.y * canvasRef.current.height - 5;

      const faceWidth = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const frameWidth = faceWidth * 1.35;
      const frameHeight =
        (frameWidth * selectedTryonImage.height) / selectedTryonImage.width;

      canvasCtx.drawImage(
        selectedTryonImage,
        centerX - frameWidth / 2,
        centerY - frameHeight / 2,
        frameWidth,
        frameHeight
      );
    }
  };

  const handleSelectTryon = (product) => {
    if (product.processedTryonImage) {
      const img = new Image();
      img.src = product.processedTryonImage;
      img.onload = () => {
        setSelectedTryonImage(img);
        setShowTryOnModal(true); // Show modal after loading image
      };
    }
  };

  const closeModal = () => {
    setShowTryOnModal(false);
    setSelectedTryonImage(null);
    if (camera.current) camera.current.stop();
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-6">Try-On Testing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg flex flex-col items-center justify-center gap-4"
            >
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>

              {product.processedTryonImage ? (
                <button
                  onClick={() => handleSelectTryon(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Try On
                </button>
              ) : (
                <p className="text-sm text-gray-500">No Try-On Image</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">
            No products available
          </p>
        )}
      </div>

      {/* Try-On Modal */}
      {showTryOnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[700px] h-[520px]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl text-gray-700 hover:text-red-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Virtual Try-On</h2>

            <div className="relative w-full flex justify-center">
              <video
                ref={webcamRef}
                autoPlay
                playsInline
                muted
                className="rounded-lg w-[640px] h-[480px]"
              ></video>
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="absolute top-0 left-0"
              ></canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryOnTesting;
