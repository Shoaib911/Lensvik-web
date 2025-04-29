import { useEffect, useRef, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const TryOnTesting = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        // Only set products that have a Try-On image
        const tryOnProducts = response.data.products.filter(p => p.processedTryonImage);
        setProducts(tryOnProducts);
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
      const centerY = nose.y * canvasRef.current.height - 15;

      const faceWidth = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const frameWidth = faceWidth * 1.15;
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
        setShowTryOnModal(true);
      };
    }
  };

  const closeModal = () => {
    setShowTryOnModal(false);
    setSelectedTryonImage(null);
    if (camera.current) camera.current.stop();
  };

  // Filter products by name, category, or sub-category
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (product.name?.toLowerCase().includes(searchLower)) ||
      (product.category?.toLowerCase().includes(searchLower)) ||
      (product.subCategory?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-6">Try-On Testing</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Product Name, Category, or Sub-Category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg flex flex-col items-center justify-center gap-4 hover:shadow-md transition"
            >
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-28 h-28 object-cover rounded-md"
              />
              <h2 className="text-sm font-semibold text-center">{product.name}</h2>

              <button
                onClick={() => handleSelectTryon(product)}
                className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700"
              >
                Try On
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-5 text-gray-500">
            No matching products found.
          </p>
        )}
      </div>

      {showTryOnModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600 z-10"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Virtual Try-On
      </h2>

      <div className="relative w-full flex justify-center">
        <video
          ref={webcamRef}
          autoPlay
          playsInline
          muted
          className="rounded-lg w-full h-auto max-h-[80vh] object-contain border border-gray-200"
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Position your face properly in the frame and hold still</p>
        <p className="text-xs text-gray-500 mt-1">
          Ensure good lighting and remove any obstructions like glasses, hats, etc.
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TryOnTesting;
