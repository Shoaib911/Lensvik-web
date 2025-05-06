import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TryOnTesting = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTryonImage, setSelectedTryonImage] = useState(null);
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const landmarkRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4008/api/product/list");
      if (res.data.success) {
        const tryonItems = res.data.products.filter((p) => p.processedTryonImage);
        setProducts(tryonItems);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading products.");
    }
  };

  const startTryOn = (product) => {
    const img = new Image();
    img.src = product.processedTryonImage;
    img.onload = () => {
      setSelectedTryonImage(img);
      setShowTryOnModal(true);
    };
  };

  useEffect(() => {
    if (showTryOnModal && selectedTryonImage) {
      setupWebcam();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const stream = videoRef.current?.srcObject;
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [showTryOnModal, selectedTryonImage]);

  const setupWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    intervalRef.current = setInterval(captureFrame, 1200);
  };

  const captureFrame = async () => {
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = video.videoWidth;
      tempCanvas.height = video.videoHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(video, 0, 0);

      const blob = await new Promise((resolve) =>
        tempCanvas.toBlob(resolve, "image/jpeg")
      );
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await axios.post("http://127.0.0.1:8000/tryon/detect", formData);

      if (res.data.success) {
        landmarkRef.current = res.data.landmarks;
        drawTryOn();
      }
    } catch (err) {
      console.error("Face detection error:", err);
    }
  };

  const drawTryOn = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;
    const landmarks = landmarkRef.current;

    if (!canvas || !ctx || !landmarks || !selectedTryonImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const { leftTemple, rightTemple, nose } = landmarks;

    const x1 = leftTemple.x * canvas.width;
    const y1 = leftTemple.y * canvas.height;
    const x2 = rightTemple.x * canvas.width;
    const y2 = rightTemple.y * canvas.height;
    const centerX = nose.x * canvas.width;
    const centerY = nose.y * canvas.height;

    const faceWidth = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const frameWidth = faceWidth * 1.25;
    const frameHeight = (frameWidth * selectedTryonImage.height) / selectedTryonImage.width;

    ctx.drawImage(
      selectedTryonImage,
      centerX - frameWidth / 2,
      centerY - frameHeight / 2,
      frameWidth,
      frameHeight
    );
  };

  const closeModal = () => {
    setShowTryOnModal(false);
    setSelectedTryonImage(null);
    landmarkRef.current = null;
    if (intervalRef.current) clearInterval(intervalRef.current);
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((t) => t.stop());
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-6">Try-On Testing</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md w-full mb-4"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-md text-center">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-24 h-24 object-cover mx-auto mb-2"
            />
            <p className="text-sm font-semibold">{product.name}</p>
            <button
              onClick={() => startTryOn(product)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Try On
            </button>
          </div>
        ))}
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

            <h2 className="text-xl font-semibold mb-4 text-center">Virtual Try-On</h2>

            <div className="relative w-full flex justify-center">
              <video
                ref={videoRef}
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

            <p className="text-sm text-center mt-3 text-gray-600">
              Position your face properly and hold still. Good lighting helps accuracy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryOnTesting;
